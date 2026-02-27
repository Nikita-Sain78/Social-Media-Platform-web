// app/feed/post/[id]/page.tsx
// URL: localhost:3000/feed/post/1
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import { POSTS } from "@/lib/data";

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const post = POSTS.find((p) => p.id === Number(params.id));
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");

  if (!post)
    return <p className="text-gray-400 text-sm p-6">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group w-fit"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />{" "}
        Back
      </button>

      {/* Full post */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5">
          <Link href="/profile" className="flex items-center gap-3 group mb-4">
            <Avatar
              initials={post.avatar}
              bg={post.avatarBg}
              size="w-12 h-12"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.name}
                </span>
                {post.verified && (
                  <CheckCircle2 size={14} className="text-indigo-500" />
                )}
              </div>
              <p className="text-xs text-gray-400">
                {post.handle} · {post.time}
              </p>
            </div>
          </Link>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {post.text.split(" ").map((w, i) =>
              w.startsWith("#") ? (
                <span key={i} className="text-indigo-500 font-semibold">
                  {w}{" "}
                </span>
              ) : (
                w + " "
              ),
            )}
          </p>
        </div>
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="w-full object-cover max-h-96"
          />
        )}
        <div className="px-5 py-3 flex items-center gap-6 border-t border-gray-50">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />{" "}
            {post.likes + (liked ? 1 : 0)}
          </button>
          <span className="flex items-center gap-1.5 text-sm text-gray-400 font-semibold">
            <MessageCircle size={18} /> {post.comments}
          </span>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-emerald-500 transition-colors">
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-4 text-sm">
          Comments ({post.commentList.length})
        </h3>
        <div className="flex flex-col gap-4 mb-5">
          {post.commentList.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar
                initials={c.avatar}
                bg={c.bg}
                size="w-8 h-8"
                textSize="text-xs"
              />
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    {c.name}
                  </span>
                  <span className="text-xs text-gray-300">{c.time}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Avatar
            initials="ME"
            bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
            size="w-8 h-8"
            textSize="text-xs"
          />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment…"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-indigo-300 text-gray-700 placeholder-gray-300 transition-colors"
          />
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-sm px-1">More posts</h3>
      {POSTS.filter((p) => p.id !== post.id).map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
