// hooks/useAuth.ts
// All auth operations as TanStack Query hooks
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";
import { useSocketStore } from "@/store/useAuthStore";

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  [key: string]: any;
}

// ─── Query Keys ──────────────────────────────────────────────
export const authKeys = {
  user: ["authUser"] as const,
};

// ─── Helper ──────────────────────────────────────────────────
const handleError = (error: unknown) =>
  toast.error(
    axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "An error occurred")
      : "An error occurred",
  );

// ─── 1. checkAuth → useQuery ─────────────────────────────────
// Replaces: checkAuth() + isCheckingAuth
// Usage:
//   const { data: authUser, isLoading: isCheckingAuth } = useCheckAuth();
export function useCheckAuth() {
  const { connectSocket } = useSocketStore();

  return useQuery<AuthUser | null>({
    queryKey: authKeys.user,
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<AuthUser>("/auth/check");
        connectSocket(res.data._id); // connect socket when auth confirmed
        return res.data;
      } catch {
        return null; // not logged in → null (no error thrown)
      }
    },
    retry: false, // don't retry on 401
    staleTime: Infinity, // auth state doesn't go stale automatically
  });
}

// ─── 2. signup → useMutation ─────────────────────────────────
// Replaces: signup(data) + isSigningUp
// Usage:
//   const { mutate: signup, isPending: isSigningUp } = useSignup();
//   signup({ fullName, email, password });
export function useSignup() {
  const queryClient = useQueryClient();
  const { connectSocket } = useSocketStore();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      const res = await axiosInstance.post<AuthUser>("/auth/signup", data);
      return res.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user, user); // update cache instantly
      connectSocket(user._id);
      toast.success("Account created successfully");
    },
    onError: handleError,
  });
}

// ─── 3. login → useMutation ──────────────────────────────────
// Replaces: login(data) + isLoggingIn
// Usage:
//   const { mutate: login, isPending: isLoggingIn } = useLogin();
//   login({ email, password });

export function useLogin() {
  const queryClient = useQueryClient();
  const { connectSocket } = useSocketStore();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post<AuthUser>("/auth/login", data);
      return res.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user, user);
      connectSocket(user._id);
      toast.success("Logged in successfully");
    },
    onError: handleError,
  });
}

// ─── 4. logout → useMutation ─────────────────────────────────
// Replaces: logout()
// Usage:
//   const { mutate: logout } = useLogout();
export function useLogout() {
  const queryClient = useQueryClient();
  const { disconnectSocket } = useSocketStore();

  return useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user, null); // clear auth cache
      disconnectSocket();
      toast.success("Logged out successfully");
    },
    onError: handleError,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<AuthUser>) => {
      const res = await axiosInstance.put<AuthUser>(
        "/auth/update-profile",
        data,
      );
      return res.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user, user); // update cache with new data
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Error in update profile:", error);
      handleError(error);
    },
  });
}

export function useAuthUser() {
  const { data: authUser, isLoading: isCheckingAuth } = useCheckAuth();
  return { authUser: authUser ?? null, isCheckingAuth };
}

export function useGetFeedPosts() {
  return useQuery<AuthUser[]>({
    queryKey: authKeys,
    queryFn: async () => {
      const res = await axiosInstance.get<AuthUser[]>("/auth/get-users");
      return res.data;
    },
  });
}
