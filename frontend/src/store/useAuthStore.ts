import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

interface SocketStore {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (userId: string) => {
    if (get().socket?.connected) return;

    const socket = io(BASE_URL, { query: { userId } });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
