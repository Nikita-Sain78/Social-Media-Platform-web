// hooks/useChat.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useChatStore } from "@/store/useChatStore";
import { useSocketStore } from "@/store/useAuthStore";
import { useAuthUser } from "@/hooks/useAuth";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
}

interface ChatUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
}

// ─── Query Keys ──────────────────────────────────────────────
export const chatKeys = {
  users: ["chatUsers"] as const,
  messages: (userId: string) => ["messages", userId] as const,
  unreadCounts: ["unreadCounts"] as const,
};

// ─── 1. Get sidebar users → useQuery ─────────────────────────
// Replaces: getUsers() + isUsersLoading
// Usage:
//   const { data: users, isLoading: isUsersLoading } = useGetUsers();
export function useGetUsers() {
  return useQuery<ChatUser[]>({
    queryKey: chatKeys.users,
    queryFn: async () => {
      const res = await axiosInstance.get("/messages/users");
      return res.data;
    },
  });
}

// ─── 2. Get messages for selected user → useQuery ────────────
// Replaces: getMessages(userId) + isMessagesLoading
// Usage:
//   const { data: messages, isLoading: isMessagesLoading } = useGetMessages(userId);
export function useGetMessages(userId: string | null) {
  const { clearUnreadForUser } = useChatStore();

  return useQuery<Message[]>({
    queryKey: chatKeys.messages(userId ?? ""),
    queryFn: async () => {
      const res = await axiosInstance.get(`/messages/${userId}`);
      clearUnreadForUser(userId!);
      return res.data;
    },
    enabled: !!userId,
  });
}

// ─── 3. Send message → useMutation ───────────────────────────
// Replaces: sendMessage(messageData)
// Usage:
//   const { mutate: sendMessage, isPending: isSending } = useSendMessage();
//   sendMessage({ text: "hello" });
export function useSendMessage() {
  const queryClient = useQueryClient();
  const { selectedUser, clearUnreadForUser } = useChatStore();

  return useMutation({
    mutationFn: async (messageData: { text?: string; image?: string }) => {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData,
      );
      return res.data as Message;
    },
    onSuccess: (newMessage) => {
      // Optimistically add message to cache instead of refetching
      queryClient.setQueryData<Message[]>(
        chatKeys.messages(selectedUser?._id ?? ""),
        (old = []) => [...old, newMessage],
      );
      clearUnreadForUser(selectedUser?._id ?? "");
    },
    onError: () => toast.error("Failed to send message"),
  });
}

// ─── 4. Get unread counts → useQuery ─────────────────────────
// Replaces: getUnreadCounts()
// Usage:
//   const { data: unreadCounts } = useGetUnreadCounts();
export function useGetUnreadCounts() {
  return useQuery<Record<string, number>>({
    queryKey: chatKeys.unreadCounts,
    queryFn: async () => {
      const res = await axiosInstance.get("/messages/unread");
      return res.data;
    },
  });
}

// ─── 5. Subscribe to socket messages ─────────────────────────
// Replaces: subscribeToMessages() + unsubscribeFromMessages()
// Usage: call this once in your chat component
//   useSubscribeToMessages();
export function useSubscribeToMessages() {
  const queryClient = useQueryClient();
  const { socket } = useSocketStore();
  const { authUser } = useAuthUser();
  const { selectedUser, clearUnreadForUser, incrementUnread } = useChatStore();

  useEffect(() => {
    if (!socket || !authUser) return;

    socket.off("newMessage");
    socket.on("newMessage", async (message: Message) => {
      // Message is from the currently open chat
      if (message.senderId === selectedUser?._id) {
        queryClient.setQueryData<Message[]>(
          chatKeys.messages(selectedUser._id),
          (old = []) => [...old, message],
        );
        clearUnreadForUser(selectedUser._id);
        // Mark as seen in backend
        await axiosInstance.put(`/messages/seen/${selectedUser._id}`);
      }
      // Message is from another user — increment unread badge
      else if (message.receiverId === authUser._id) {
        incrementUnread(message.senderId);
        // Also invalidate unread counts query so sidebar refreshes
        queryClient.invalidateQueries({ queryKey: chatKeys.unreadCounts });
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [
    socket,
    authUser,
    selectedUser,
    queryClient,
    clearUnreadForUser,
    incrementUnread,
  ]);
}

// ─── 6. Subscribe to typing indicators ───────────────────────
// Replaces: subscribeToTyping() + unsubscribeFromTyping()
// Usage: call this once in your chat component
//   useSubscribeToTyping();
export function useSubscribeToTyping() {
  const { socket } = useSocketStore();
  const { authUser } = useAuthUser();
  const { setTyping, removeTyping } = useChatStore();

  useEffect(() => {
    if (!socket?.connected || !authUser) return;

    socket.off("typing");
    socket.off("stopTyping");

    socket.on(
      "typing",
      ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
        if (
          !senderId ||
          senderId === authUser._id ||
          receiverId !== authUser._id
        )
          return;
        setTyping(senderId);
      },
    );

    socket.on(
      "stopTyping",
      ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
        if (
          !senderId ||
          senderId === authUser._id ||
          receiverId !== authUser._id
        )
          return;
        removeTyping(senderId);
      },
    );

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, authUser, setTyping, removeTyping]);
}
