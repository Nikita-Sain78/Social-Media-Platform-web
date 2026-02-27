import { create } from "zustand";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface ChatUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
}

interface ChatStore {
  selectedUser: ChatUser | null;
  unreadCounts: Record<string, number>;
  typingUsers: Record<string, boolean>;
  setSelectedUser: (user: ChatUser | null) => void;
  clearUnreadForUser: (userId: string) => void;
  incrementUnread: (userId: string) => void;
  setTyping: (userId: string) => void;
  removeTyping: (userId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedUser: null,
  unreadCounts: {},
  typingUsers: {},

  setSelectedUser: (user) => set({ selectedUser: user }),

  clearUnreadForUser: (userId) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [userId]: 0 },
    })),

  incrementUnread: (userId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [userId]: (state.unreadCounts[userId] || 0) + 1,
      },
    })),

  setTyping: (userId) =>
    set((state) => ({
      typingUsers: { ...state.typingUsers, [userId]: true },
    })),

  removeTyping: (userId) =>
    set((state) => {
      const updated = { ...state.typingUsers };
      delete updated[userId];
      return { typingUsers: updated };
    }),
}));
