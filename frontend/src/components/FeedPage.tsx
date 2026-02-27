// app/feed/page.tsx
// URL: localhost:3000/feed
"use client";
import Link from "next/link";
import { Plus, TrendingUp } from "lucide-react";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import { POSTS, MESSAGES, DISCOVER_TOPICS } from "@/lib/data";
import { useGetFeedPosts } from "@/hooks/usePost";
import { useEffect } from "react";

export default function FeedPage() {
  // useEffect(() => {
  const { data: postData } = useGetFeedPosts();
  console.log(postData, "data");

  // if (isLoading) return <div>Loading...</div>;
  // });
  return (
    <div className="flex gap-6 max-w-5xl mx-auto">
      {/* ── Center feed ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        {/* Stories */}
        {/* <div className="flex gap-3 overflow-x-auto pb-1">
          <div className="flex-shrink-0 w-28 h-40 rounded-2xl border-2 border-dashed border-indigo-200 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
              <Plus size={18} color="#fff" />
            </div>
            <span className="text-xs font-semibold text-gray-500">
              Create Story
            </span>
          </div>
          {POSTS.map((p) => (
            <Link
              key={p.id}
              href={`/feed/post/${p.id}`}
              className="flex-shrink-0 w-28 h-40 rounded-2xl overflow-hidden relative group"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: p.avatarBg }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div
                className="absolute top-2 left-2 w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center text-white text-xs font-bold"
                style={{ background: p.avatarBg }}
              >
                {p.avatar[0]}
              </div>
              <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold">
                {p.time}
              </p>
            </Link>
          ))}
        </div> */}

        {/* Create post bar */}
        {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <Avatar
            initials="ME"
            bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
            size="w-9 h-9"
            textSize="text-xs"
          />
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
            What&apos;s on your mind?
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <Plus size={15} /> Post
          </button>
        </div> */}

        {/* Posts list — each PostCard has Links inside pointing to /feed/post/[id] */}
        {postData?.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>

      {/* ── Right sidebar ── */}
      <div className="hidden xl:flex flex-col gap-5 w-72 flex-shrink-0">
        {/* Ad */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Sponsored
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80"
            alt="ad"
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <p className="font-bold text-sm text-gray-900 mb-1">
              Email marketing
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Supercharge your marketing with a powerful platform.
            </p>
            <button className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Messages preview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-900">
              Recent Messages
            </span>
            {/* Link navigates to /messages — URL actually changes */}
            <Link
              href="/messages"
              className="text-xs text-indigo-500 font-semibold hover:underline"
            >
              View all
            </Link>
          </div>
          {MESSAGES.slice(0, 3).map((m) => (
            <Link
              key={m.id}
              href="/messages"
              className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-1.5 -mx-1.5 transition-colors"
            >
              <Avatar
                initials={m.avatar}
                bg={m.bg}
                size="w-9 h-9"
                textSize="text-xs"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {m.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{m.msg}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-300">{m.time}</span>
                {m.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                    {m.unread}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Trending */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={15} className="text-indigo-500" />
            <span className="text-sm font-bold text-gray-900">Trending</span>
          </div>
          {DISCOVER_TOPICS.slice(0, 4).map((t) => (
            <div key={t.tag} className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.color}`}
              >
                {t.tag}
              </span>
              <span className="text-xs text-gray-400">{t.posts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
