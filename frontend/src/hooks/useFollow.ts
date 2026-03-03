"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

export interface Follow {
  id: string;
  following: string;
  follower: string;
  createdAt: string;
}

export const followKeys = {
  all: ["follow"] as const,
  lists: () => [...followKeys.all, "list"] as const,
  followers: (userId: string) =>
    [...followKeys.all, "followers", userId] as const,
  following: (userId: string) =>
    [...followKeys.all, "following", userId] as const,
  requests: () => [...followKeys.all, "requests"] as const,
};

const handleError = (error: unknown) =>
  toast.error(
    axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "An error occurred")
      : "An error occurred",
  );

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (followId: string) => {
      const res = await axiosInstance.post(
        `/follow-request/follow/${followId}`,
      );
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: followKeys.all });
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Something went wrong")
          : "Something went wrong",
      );
    },
  });
}

export function useGetFollowRequests() {
  return useQuery({
    queryKey: followKeys.requests(),
    queryFn: async () => {
      const res = await axiosInstance.get("/follow-request/follow/requests");
      return res.data.requests;
    },
  });
}

export function useAcceptFollowRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await axiosInstance.post(
        `/follow-request/follow/accept/${requestId}`,
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followKeys.requests() });
      queryClient.invalidateQueries({ queryKey: followKeys.all });
      toast.success("Follow request accepted");
    },

    onError: handleError,
  });
}

export function useRejectFollowRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await axiosInstance.post(
        `/follow-request/follow/reject/${requestId}`,
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followKeys.requests() });
      toast.success("Follow request rejected");
    },

    onError: handleError,
  });
}

export function useGetFollowers(followerId: string) {
  return useQuery({
    queryKey: followKeys.followers(followerId),
    queryFn: async () => {
      const res = await axiosInstance.get(`/follow/followers/${followerId}`);
      return res.data.followers;
    },
  });
}

export function useGetFollowing(followingId: string) {
  return useQuery({
    queryKey: followKeys.following(followingId),
    queryFn: async () => {
      const res = await axiosInstance.get(`/follow/following/${followingId}`);
      return res.data.following;
    },
  });
}
