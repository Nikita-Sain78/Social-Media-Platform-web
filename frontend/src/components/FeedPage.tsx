// app/feed/page.tsx
// URL: localhost:3000/feed
"use client";
import Link from "next/link";
import { Plus, TrendingUp } from "lucide-react";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import { MESSAGES, DISCOVER_TOPICS } from "@/lib/data";
import { useGetFeedPosts } from "@/hooks/usePost";

export default function FeedPage() {
  const { data: postData } = useGetFeedPosts();

  return (
    <div className="flex gap-6 max-w-5xl mx-auto">
      {/* ── Center feed ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        {postData?.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>

      {/* ── Right sidebar ── */}
      <div className="hidden xl:flex flex-col gap-5 w-72 flex-shrink-0 sticky">
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
