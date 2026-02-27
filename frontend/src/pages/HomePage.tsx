"use client";

import { useState } from "react";
import {
  Home,
  MessageSquare,
  Users,
  Compass,
  User,
  Plus,
  Zap,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Send,
  Phone,
  Video,
  UserPlus,
  Hash,
  TrendingUp,
  Star,
  ArrowLeft,
  MapPin,
  VerifiedIcon,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────
type Route =
  | { id: "feed" }
  | { id: "messages" }
  | { id: "connections" }
  | { id: "discover" }
  | { id: "profile"; userId?: number }
  | { id: "post"; postId: number };

// ─── Fake Data ───────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    name: "Great Stack",
    handle: "@greatstack",
    verified: true,
    time: "33 min ago",
    avatar: "GS",
    avatarBg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    text: "Stay ahead of the curve with fresh content on #code, #design, #startups, and everything in between. The future belongs to those who keep learning every single day 🚀",
    tags: ["#code", "#design", "#startups"],
    likes: 248,
    comments: 42,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=700&q=80",
    commentList: [
      {
        id: 1,
        name: "Alison Mars",
        avatar: "AM",
        bg: "linear-gradient(135deg,#f472b6,#fb923c)",
        text: "This is so insightful, thanks!",
        time: "20 min ago",
      },
      {
        id: 2,
        name: "John Warren",
        avatar: "JW",
        bg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        text: "Totally agree 🙌",
        time: "15 min ago",
      },
    ],
  },
  {
    id: 2,
    name: "Alison Mars",
    handle: "@alisonmars",
    verified: false,
    time: "1 hr ago",
    avatar: "AM",
    avatarBg: "linear-gradient(135deg,#f472b6,#fb923c)",
    text: "Just finished redesigning our onboarding flow — the drop-off rate went from 42% to 11% 🚀 Details in thread 👇 #ux #design #product",
    tags: ["#design", "#ux"],
    likes: 512,
    comments: 87,
    image: null,
    commentList: [
      {
        id: 1,
        name: "Great Stack",
        avatar: "GS",
        bg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        text: "Incredible results! What tool did you use?",
        time: "45 min ago",
      },
    ],
  },
  {
    id: 3,
    name: "Richard John",
    handle: "@richardj",
    verified: true,
    time: "2 hr ago",
    avatar: "RJ",
    avatarBg: "linear-gradient(135deg,#34d399,#3b82f6)",
    text: "This view from the morning hike was absolutely worth it. Nature recharges like nothing else 🏔️ #travel #nature #hiking",
    tags: ["#travel", "#nature"],
    likes: 1024,
    comments: 133,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    commentList: [
      {
        id: 1,
        name: "Sarah Kim",
        avatar: "SK",
        bg: "linear-gradient(135deg,#fbbf24,#ef4444)",
        text: "Where is this?! Stunning 😍",
        time: "1 hr ago",
      },
      {
        id: 2,
        name: "Alison Mars",
        avatar: "AM",
        bg: "linear-gradient(135deg,#f472b6,#fb923c)",
        text: "Goals 🏔️",
        time: "1 hr ago",
      },
    ],
  },
];

const MESSAGES = [
  {
    id: 1,
    name: "Alison Mars",
    avatar: "AM",
    bg: "linear-gradient(135deg,#f472b6,#fb923c)",
    msg: "How are you?",
    time: "6 days ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Richard John",
    avatar: "RJ",
    bg: "linear-gradient(135deg,#34d399,#3b82f6)",
    msg: "hi",
    time: "6 days ago",
    unread: 0,
  },
  {
    id: 3,
    name: "John Warren",
    avatar: "JW",
    bg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    msg: "This is a Bluetooth speaker",
    time: "14 days ago",
    unread: 0,
  },
];

const CONNECTIONS = [
  {
    id: 1,
    name: "Emma Wilson",
    handle: "@emmawilson",
    avatar: "EW",
    bg: "linear-gradient(135deg,#a78bfa,#60a5fa)",
    mutual: 12,
    field: "Product Designer",
  },
  {
    id: 2,
    name: "James Park",
    handle: "@jamespark",
    avatar: "JP",
    bg: "linear-gradient(135deg,#f472b6,#fb923c)",
    mutual: 8,
    field: "Frontend Engineer",
  },
  {
    id: 3,
    name: "Nina Torres",
    handle: "@ninatorres",
    avatar: "NT",
    bg: "linear-gradient(135deg,#34d399,#3b82f6)",
    mutual: 5,
    field: "Startup Founder",
  },
  {
    id: 4,
    name: "Leo Zhang",
    handle: "@leozhang",
    avatar: "LZ",
    bg: "linear-gradient(135deg,#fbbf24,#f97316)",
    mutual: 3,
    field: "Data Scientist",
  },
  {
    id: 5,
    name: "Priya Nair",
    handle: "@priyanair",
    avatar: "PN",
    bg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    mutual: 9,
    field: "UX Researcher",
  },
];

const DISCOVER_TOPICS = [
  {
    tag: "#design",
    posts: "12.4k posts",
    color: "bg-violet-100 text-violet-700",
  },
  { tag: "#startups", posts: "8.9k posts", color: "bg-blue-100 text-blue-700" },
  {
    tag: "#code",
    posts: "21.3k posts",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    tag: "#travel",
    posts: "34.1k posts",
    color: "bg-amber-100 text-amber-700",
  },
  { tag: "#ux", posts: "6.7k posts", color: "bg-pink-100 text-pink-700" },
  { tag: "#ai", posts: "15.2k posts", color: "bg-indigo-100 text-indigo-700" },
];

// ─── Shared Components ───────────────────────────────────────
const Avatar = ({
  initials,
  bg,
  size = "w-10 h-10",
  textSize = "text-sm",
}: any) => (
  <div
    className={`${size} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${textSize}`}
    style={{ background: bg }}
  >
    {initials}
  </div>
);

const BackButton = ({ onBack }: { onBack: () => void }) => (
  <button
    onClick={onBack}
    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors mb-5 group"
  >
    <ArrowLeft
      size={16}
      className="group-hover:-translate-x-0.5 transition-transform"
    />
    Back
  </button>
);

// ─── Post Card (Feed) ─────────────────────────────────────────
const PostCard = ({
  post,
  onNavigate,
}: {
  post: any;
  onNavigate: (r: Route) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <button
            className="flex items-center gap-3 group"
            onClick={() => onNavigate({ id: "profile" })}
          >
            <Avatar initials={post.avatar} bg={post.avatarBg} />
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {post.name}
                </span>
                {post.verified && (
                  <CheckCircle2 size={13} className="text-indigo-500" />
                )}
              </div>
              <p className="text-xs text-gray-400">
                {post.handle} · {post.time}
              </p>
            </div>
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Clickable post text → PostDetail */}
        <button
          className="text-left w-full"
          onClick={() => onNavigate({ id: "post", postId: post.id })}
        >
          <p className="text-sm text-gray-700 leading-relaxed mb-3 hover:text-gray-900 transition-colors">
            {post.text.split(" ").map((word: string, i: number) =>
              word.startsWith("#") ? (
                <span key={i} className="text-indigo-500 font-semibold">
                  {word}{" "}
                </span>
              ) : (
                word + " "
              ),
            )}
          </p>
        </button>
      </div>

      {post.image && (
        <button
          className="w-full block"
          onClick={() => onNavigate({ id: "post", postId: post.id })}
        >
          <img
            src={post.image}
            alt="post"
            className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
          />
        </button>
      )}

      <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />{" "}
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-indigo-500 transition-colors"
            onClick={() => onNavigate({ id: "post", postId: post.id })}
          >
            <MessageCircle size={16} /> {post.comments}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-emerald-500 transition-colors">
            <Share2 size={16} />
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`transition-colors ${saved ? "text-amber-500" : "text-gray-400 hover:text-amber-400"}`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

// ─── Views ───────────────────────────────────────────────────

/** FEED */
const FeedView = ({ onNavigate }: { onNavigate: (r: Route) => void }) => (
  <div className="flex gap-6 max-w-5xl mx-auto">
    <div className="flex-1 min-w-0 flex flex-col gap-5">
      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        <div className="flex-shrink-0 w-28 h-40 rounded-2xl border-2 border-dashed border-indigo-200 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 transition-colors group">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <Plus size={18} color="#fff" />
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Create Story
          </span>
        </div>
        {POSTS.map((p) => (
          <button
            key={p.id}
            onClick={() => onNavigate({ id: "post", postId: p.id })}
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
          </button>
        ))}
      </div>

      {/* Create Post Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
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
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
        >
          <Plus size={15} /> Post
        </button>
      </div>

      {POSTS.map((p) => (
        <PostCard key={p.id} post={p} onNavigate={onNavigate} />
      ))}
    </div>

    {/* Right sidebar */}
    <div className="hidden xl:flex flex-col gap-5 w-72 flex-shrink-0">
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
            Supercharge your marketing with a powerful platform built for
            results.
          </p>
          <button className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-900">
            Recent Messages
          </span>
          <button
            onClick={() => onNavigate({ id: "messages" })}
            className="text-xs text-indigo-500 font-semibold hover:underline"
          >
            View all
          </button>
        </div>
        {MESSAGES.slice(0, 3).map((m) => (
          <button
            key={m.id}
            onClick={() => onNavigate({ id: "messages" })}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-1.5 -mx-1.5 transition-colors w-full text-left"
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
          </button>
        ))}
      </div>

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

/** POST DETAIL */
const PostDetailView = ({
  postId,
  onNavigate,
}: {
  postId: number;
  onNavigate: (r: Route) => void;
}) => {
  const post = POSTS.find((p) => p.id === postId);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  if (!post) return null;
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
      <BackButton onBack={() => onNavigate({ id: "feed" })} />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5">
          <button
            className="flex items-center gap-3 group mb-4"
            onClick={() => onNavigate({ id: "profile" })}
          >
            <Avatar
              initials={post.avatar}
              bg={post.avatarBg}
              size="w-12 h-12"
            />
            <div className="text-left">
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
          </button>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {post.text.split(" ").map((word, i) =>
              word.startsWith("#") ? (
                <span key={i} className="text-indigo-500 font-semibold">
                  {word}{" "}
                </span>
              ) : (
                word + " "
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
          <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-400">
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
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* More posts */}
      <h3 className="font-bold text-gray-900 text-sm px-1">More posts</h3>
      {POSTS.filter((p) => p.id !== postId).map((p) => (
        <PostCard key={p.id} post={p} onNavigate={onNavigate} />
      ))}
    </div>
  );
};

/** MESSAGES */
// const MessagesView = () => {
//   const [active, setActive] = useState(MESSAGES[0].id);
//   const activeMsg = MESSAGES.find((m) => m.id === active)!;
//   return (
//     <div
//       className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
//       style={{ height: "calc(100vh - 130px)" }}
//     >
//       <div className="w-72 border-r border-gray-100 flex flex-col">
//         <div className="p-4 border-b border-gray-100">
//           <h2 className="font-bold text-gray-900 mb-3">Messages</h2>
//           <div className="relative">
//             <Search
//               size={13}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               placeholder="Search…"
//               className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 text-xs outline-none text-gray-700 placeholder-gray-300 border border-gray-100 focus:border-indigo-300"
//             />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {MESSAGES.map((m) => (
//             <button
//               key={m.id}
//               onClick={() => setActive(m.id)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors w-full text-left ${active === m.id ? "bg-indigo-50 border-r-2 border-indigo-500" : "hover:bg-gray-50"}`}
//             >
//               <Avatar
//                 initials={m.avatar}
//                 bg={m.bg}
//                 size="w-10 h-10"
//                 textSize="text-sm"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-bold text-gray-900 truncate">
//                     {m.name}
//                   </p>
//                   <span className="text-xs text-gray-300">{m.time}</span>
//                 </div>
//                 <p className="text-xs text-gray-400 truncate">{m.msg}</p>
//               </div>
//               {m.unread > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
//                   {m.unread}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="flex-1 flex flex-col">
//         <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar
//               initials={activeMsg.avatar}
//               bg={activeMsg.bg}
//               size="w-10 h-10"
//               textSize="text-sm"
//             />
//             <div>
//               <p className="font-bold text-gray-900 text-sm">
//                 {activeMsg.name}
//               </p>
//               <p className="text-xs text-emerald-500 font-semibold">● Online</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 text-gray-400">
//             <button className="hover:text-indigo-500 transition-colors">
//               <Phone size={18} />
//             </button>
//             <button className="hover:text-indigo-500 transition-colors">
//               <Video size={18} />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 p-5 flex flex-col justify-end gap-3 bg-gray-50/50">
//           <div className="flex justify-end">
//             <div className="bg-indigo-500 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs shadow-sm">
//               Hey! How are things going?
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <Avatar
//               initials={activeMsg.avatar}
//               bg={activeMsg.bg}
//               size="w-7 h-7"
//               textSize="text-xs"
//             />
//             <div className="bg-white text-gray-700 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs shadow-sm border border-gray-100">
//               {activeMsg.msg}
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t border-gray-100 flex items-center gap-3">
//           <input
//             placeholder="Type a message…"
//             className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-300 text-gray-700 placeholder-gray-300 transition-colors"
//           />
//           <button
//             className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
//             style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
//           >
//             <Send size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useAuthStore } from "@/store/useAuthStore";

const Messages = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

/** CONNECTIONS */
const ConnectionsView = ({
  onNavigate,
}: {
  onNavigate: (r: Route) => void;
}) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-bold text-gray-900 text-lg">People you may know</h2>
      <div className="relative">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          placeholder="Search people…"
          className="pl-8 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-xs outline-none text-gray-700 placeholder-gray-300 focus:border-indigo-300 transition-colors w-44"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {CONNECTIONS.map((c) => (
        <div
          key={c.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onNavigate({ id: "profile", userId: c.id })}
            className="flex flex-col items-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3"
              style={{ background: c.bg }}
            >
              {c.avatar}
            </div>
            <p className="font-bold text-gray-900 text-sm hover:text-indigo-600 transition-colors">
              {c.name}
            </p>
          </button>
          <p className="text-xs text-gray-400 mb-1">{c.handle}</p>
          <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-3">
            {c.field}
          </span>
          <p className="text-xs text-gray-400 mb-4">
            {c.mutual} mutual connections
          </p>
          <button
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <UserPlus size={13} /> Connect
          </button>
        </div>
      ))}
    </div>
  </div>
);

/** DISCOVER */
const DiscoverView = ({ onNavigate }: { onNavigate: (r: Route) => void }) => (
  <div className="flex flex-col gap-6">
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        placeholder="Search topics, people, posts…"
        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm outline-none text-gray-700 placeholder-gray-300 focus:border-indigo-300 transition-colors shadow-sm"
      />
    </div>
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Hash size={16} className="text-indigo-500" />
        <h2 className="font-bold text-gray-900">Trending Topics</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DISCOVER_TOPICS.map((t) => (
          <div
            key={t.tag}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${t.color}`}
            >
              {t.tag}
            </span>
            <p className="text-xs text-gray-400 mt-2">{t.posts}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Star size={16} className="text-amber-400" />
        <h2 className="font-bold text-gray-900">Suggested for you</h2>
      </div>
      <div className="flex flex-col gap-3">
        {CONNECTIONS.slice(0, 3).map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <button onClick={() => onNavigate({ id: "profile", userId: c.id })}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: c.bg }}
              >
                {c.avatar}
              </div>
            </button>
            <div className="flex-1">
              <button
                onClick={() => onNavigate({ id: "profile", userId: c.id })}
              >
                <p className="font-bold text-gray-900 text-sm hover:text-indigo-600 transition-colors">
                  {c.name}
                </p>
              </button>
              <p className="text-xs text-gray-400">
                {c.field} · {c.mutual} mutual
              </p>
            </div>
            <button className="px-4 py-1.5 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** PROFILE */
const ProfileView = ({
  userId,
  onNavigate,
}: {
  userId?: number;
  onNavigate: (r: Route) => void;
}) => {
  const isOwn = !userId;
  const person = userId ? CONNECTIONS.find((c) => c.id === userId) : null;
  const name = isOwn ? "My Name" : (person?.name ?? "User");
  const handle = isOwn ? "@myhandle" : (person?.handle ?? "@user");
  const avatarInitials = isOwn ? "ME" : (person?.avatar ?? "U");
  const avatarBg = isOwn
    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
    : (person?.bg ?? "#ccc");

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
      {!isOwn && (
        <BackButton onBack={() => onNavigate({ id: "connections" })} />
      )}
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div
          className="h-36 w-full"
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)",
          }}
        />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-white text-2xl font-extrabold shadow-md"
              style={{ background: avatarBg }}
            >
              {avatarInitials}
            </div>
            {isOwn ? (
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5">
                <Settings size={13} /> Edit Profile
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                }}
              >
                <UserPlus size={13} /> Connect
              </button>
            )}
          </div>
          <h2 className="font-extrabold text-gray-900 text-xl tracking-tight">
            {name}
          </h2>
          <p className="text-sm text-gray-400 mb-2">
            {handle} · <MapPin size={11} className="inline" /> San Francisco, CA
          </p>
          {person && (
            <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {person.field}
            </span>
          )}
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Building things on the internet. Love design, code and coffee ☕
          </p>
          <div className="flex gap-6 mt-4">
            {[
              ["248", "Posts"],
              ["4.2k", "Followers"],
              ["312", "Following"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="font-extrabold text-gray-900 text-lg leading-none">
                  {val}
                </p>
                <p className="text-xs text-gray-400">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-sm px-1">Posts</h3>
      {POSTS.slice(0, 2).map((p) => (
        <PostCard key={p.id} post={p} onNavigate={onNavigate} />
      ))}
    </div>
  );
};

// ─── NAV CONFIG ──────────────────────────────────────────────
const NAV = [
  { id: "feed", label: "Feed", icon: Home },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "connections", label: "Connections", icon: Users },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "profile", label: "Profile", icon: User },
];

// Route → page title
const routeTitle = (r: Route) => {
  if (r.id === "post") return "Post";
  if (r.id === "profile" && r.userId) return "Profile";
  return NAV.find((n) => n.id === r.id)?.label ?? "";
};

// ─── ROOT LAYOUT ─────────────────────────────────────────────
const HomePage = () => {
  const [route, setRoute] = useState<Route>({ id: "feed" });

  const navigate = (r: Route) => setRoute(r);
  const { logout } = useAuthStore();

  const activeNavId = [
    "feed",
    "messages",
    "connections",
    "discover",
    "profile",
  ].includes(route.id)
    ? route.id
    : route.id === "post"
      ? "feed"
      : "profile";

  const handleNavClick = (id: string) => {
    if (id === "profile") navigate({ id: "profile" });
    else navigate({ id: id as any });
  };

  const router = useRouter();
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); * { font-family: 'Plus Jakarta Sans', sans-serif; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }`}</style>

      <div
        className="min-h-screen bg-gray-50 flex"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* ── Sidebar ── */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 shadow-sm fixed top-0 left-0 h-full z-30 px-3 py-5">
          <div className="flex items-center gap-2 px-3 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
            >
              <Zap size={16} color="#fff" fill="#fff" />
            </div>
            <span
              className="font-extrabold text-base tracking-tight"
              style={{ color: "#1e1b4b" }}
            >
              chatapp
            </span>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full text-left
                  ${activeNavId === id ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              >
                <Icon
                  size={18}
                  className={
                    activeNavId === id ? "text-indigo-500" : "text-gray-400"
                  }
                />
                {label}
                {id === "messages" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate({ id: "feed" })}
            className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <Plus size={16} /> Create Post
          </button>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 px-1">
            <button
              onClick={() => navigate({ id: "profile" })}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              ME
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">
                My Name
              </p>
              <p className="text-xs text-gray-400 truncate">@myhandle</p>
            </div>
            {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Settings size={14} />
            </button> */}
            <button
              className="flex gap-2 items-center bg-black-100"
              onClick={logout}
            >
              <LogOut className="size-5 text-gray-400" />
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 md:ml-56 flex flex-col min-h-screen">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center gap-3">
            {(route.id === "post" ||
              (route.id === "profile" && (route as any).userId)) && (
              <button
                onClick={() => {
                  if (route.id === "post") navigate({ id: "feed" });
                  else navigate({ id: "connections" });
                }}
                className="text-gray-400 hover:text-indigo-600 transition-colors mr-1"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <h1 className="font-extrabold text-gray-900 text-base capitalize tracking-tight flex-1">
              {routeTitle(route)}
            </h1>
            {/* Breadcrumb path */}
            <span className="hidden sm:block text-xs text-gray-300 font-mono">
              /
              {route.id === "post"
                ? `feed/post/${(route as any).postId}`
                : route.id === "profile" && (route as any).userId
                  ? `connections/profile/${(route as any).userId}`
                  : route.id}
            </span>
            <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-500 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button
              onClick={() => navigate({ id: "profile" })}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              ME
            </button>
          </header>

          {/* Dynamic View */}
          <div className="flex-1 p-5 md:p-6 overflow-y-auto">
            {route.id === "feed" && <FeedView onNavigate={navigate} />}
            {route.id === "post" && (
              <PostDetailView
                postId={(route as any).postId}
                onNavigate={navigate}
              />
            )}
            {route.id === "messages" && <Messages />}
            {route.id === "connections" && (
              <ConnectionsView onNavigate={navigate} />
            )}
            {route.id === "discover" && <DiscoverView onNavigate={navigate} />}
            {route.id === "profile" && (
              <ProfileView
                userId={(route as any).userId}
                onNavigate={navigate}
              />
            )}
          </div>
        </main>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 z-30">
          {NAV.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${activeNavId === id ? "text-indigo-500" : "text-gray-400"}`}
            >
              <Icon size={20} />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default HomePage;
