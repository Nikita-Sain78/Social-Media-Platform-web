"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  description: string;
  media?: string;
  createdBy: {
    _id: string;
    fullName: string;
    profilePic?: string;
  };
  likedBy: string[];
  likesCount: number;
  isLikedByMe: boolean;
  commentCount: number;
  createdAt: string;
}

export interface CreatePostData {
  description: string;
  media?: string;
}

// ─── Query Keys ──────────────────────────────────────────────
export const postKeys = {
  all: ["posts"] as const,
  feed: () => [...postKeys.all, "feed"] as const,
  myPosts: () => [...postKeys.all, "myPosts"] as const,
  single: (postId: string) => [...postKeys.all, postId] as const,
  comments: (postId: string) => [...postKeys.all, postId, "comments"] as const,
};

// ─── Helper ──────────────────────────────────────────────────
const handleError = (error: unknown) =>
  toast.error(
    axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "An error occurred")
      : "An error occurred",
  );

// ─── 1. Get Feed Posts ────────────────────────────────────────
// Usage: const { data: posts, isLoading } = useGetFeedPosts();
export function useGetFeedPosts() {
  return useQuery<Post[]>({
    queryKey: postKeys.feed(),
    queryFn: async () => {
      const res = await axiosInstance.get<Post[]>("/posts/all-posts");
      return res.data.posts;
    },
  });
}

// ─── 2. Get My Posts ─────────────────────────────────────────
// Usage: const { data: myPosts, isLoading } = useGetMyPosts();
export function useGetMyPosts() {
  return useQuery<Post[]>({
    queryKey: postKeys.myPosts(),
    queryFn: async () => {
      const res = await axiosInstance.get("/posts/my-posts");
      console.log(res, "res");
      return res.data.userPosts;
    },
  });
}

// ─── 3. Get Single Post ───────────────────────────────────────
// Usage: const { data: post } = useGetPost(postId);
export function useGetPost(postId: string | null) {
  return useQuery<Post>({
    queryKey: postKeys.single(postId ?? ""),
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const res = await axiosInstance.post<Post>("/posts/create-post", data);
      return res.data;
    },
    onSuccess: (newPost) => {
      // Add new post to feed cache instantly without refetching
      queryClient.setQueryData<Post[]>(postKeys.feed(), (old = []) => [
        newPost,
        ...old,
      ]);
      // Also invalidate myPosts so profile page reflects new post
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
      toast.success("Post created successfully");
    },
    onError: handleError,
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      await axiosInstance.delete(`/posts/${postId}`);
      return postId;
    },
    onSuccess: (deletedPostId) => {
      // Remove from feed cache instantly
      queryClient.setQueryData<Post[]>(postKeys.feed(), (old = []) =>
        old.filter((p) => p._id !== deletedPostId),
      );
      queryClient.setQueryData<Post[]>(postKeys.myPosts(), (old = []) =>
        old.filter((p) => p._id !== deletedPostId),
      );
      toast.success("Post deleted");
    },
    onError: handleError,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, text }: { postId: string; text: string }) => {
      const res = await axiosInstance.post(`/comment/add-comment/${postId}`, {
        comment: text,
      });
      return { postId, comment: res.data };
    },
    onSuccess: ({ postId }) => {
      // Invalidate comments for this post
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      // Increment comment count in feed cache
      queryClient.setQueryData<Post[]>(postKeys.feed(), (old = []) =>
        old.map((p) =>
          p._id === postId ? { ...p, commentCount: p.commentCount + 1 } : p,
        ),
      );
    },
    onError: handleError,
  });
}

export function useGetComments(postId: string) {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: async () => {
      const res = await axiosInstance.get(`/comment/get-comments/${postId}`);
      return res.data.comments;
    },
    enabled: !!postId,
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      postId,
    }: {
      commentId: string;
      postId: string;
    }) => {
      await axiosInstance.delete(`/comment/delete-comment/${commentId}`);
      return { commentId, postId };
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      queryClient.setQueryData<Post[]>(postKeys.feed(), (old = []) =>
        old.map((p) =>
          p._id === postId ? { ...p, commentCount: p.commentCount - 1 } : p,
        ),
      );
    },
    onError: handleError,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await axiosInstance.post(`/like/${postId}`);
      return res.data; // { success, liked }
    },
    onSuccess: (data, postId) => {
      // Update feed cache instantly without refetching
      queryClient.setQueryData<Post[]>(postKeys.feed(), (old = []) =>
        old.map((p) =>
          p._id === postId
            ? {
                ...p,
                isLikedByMe: data.liked,
                likesCount: data.liked ? p.likesCount + 1 : p.likesCount - 1,
              }
            : p,
        ),
      );
    },
    onError: handleError,
  });
}
