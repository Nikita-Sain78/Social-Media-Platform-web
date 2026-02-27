// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   Bookmark,
//   MoreHorizontal,
//   CheckCircle2,
// } from "lucide-react";
// import Avatar from "./Avatar";
// import { useGetPost, useToggleLike } from "@/hooks/usePost";

// export default function PostCard({ post }: { post: any }) {
//   const [liked, setLiked] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [likesCount, setLikesCount] = useState(post.likesCount);
//   const { mutate: toggleLike } = useToggleLike();
//   const { data: singlePost } = useGetPost(postId);

//   const handleLike = (postId: string) => {
//     toggleLike(postId);
//     setLiked(!liked);
//     setLikesCount((prev: any) => prev + 1);
//     singlePost(postId);
//   };
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
//       <div className="p-5">
//         <div className="flex items-center justify-between mb-3">
//           {/* Clicking author → /profile */}
//           <Link href="/profile" className="flex items-center gap-3 group">
//             <Avatar initials={post.avatar} bg={post.title} />
//             <div>
//               <div className="flex items-center gap-1">
//                 <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
//                   {post.title}
//                 </span>
//                 {post.verified && (
//                   <CheckCircle2 size={13} className="text-indigo-500" />
//                 )}
//               </div>
//               <p className="text-xs text-gray-400">
//                 {post.title} · {post.title}
//               </p>
//             </div>
//           </Link>
//           <button className="text-gray-400 hover:text-gray-600">
//             <MoreHorizontal size={18} />
//           </button>
//         </div>

//         {/* Clicking text → /feed/post/[id] */}
//         <Link
//           href={`/feed/post/${post._id}`}
//           className="block text-sm text-gray-700 leading-relaxed mb-3 hover:text-gray-900 transition-colors"
//         >
//           {post.title.split(" ").map((word: string, i: number) =>
//             word.startsWith("#") ? (
//               <span key={i} className="text-indigo-500 font-semibold">
//                 {word}{" "}
//               </span>
//             ) : (
//               word + " "
//             ),
//           )}
//         </Link>
//       </div>

//       {/* Clicking image → /feed/post/[id] */}
//       {post.image && (
//         <Link href={`/feed/post/${post.id}`} className="block">
//           <img
//             src={post.media}
//             alt=""
//             className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
//           />
//         </Link>
//       )}

//       <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
//         <div className="flex items-center gap-5">
//           <button
//             onClick={() => handleLike(post._id)}
//             className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
//           >
//             <Heart size={16} fill={liked ? "currentColor" : "none"} />{" "}
//             {likesCount}
//           </button>
//           <Link
//             href={`/feed/post/${post.id}`}
//             className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-indigo-500 transition-colors"
//           >
//             <MessageCircle size={16} /> {post.commentCount}
//           </Link>
//           {/* <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-emerald-500 transition-colors">
//             <Share2 size={16} />
//           </button> */}
//         </div>
//         <button
//           onClick={() => setSaved(!saved)}
//           className={`transition-colors ${saved ? "text-amber-500" : "text-gray-400 hover:text-amber-400"}`}
//         >
//           <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import Avatar from "./Avatar";
import { useGetPost, useToggleLike } from "@/hooks/usePost";

export default function PostCard({ post }: { post: any }) {
  const [saved, setSaved] = useState(false);
  const { mutate: toggleLike } = useToggleLike();
  // const { data: singlePost } = useGetPost(id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Link href="/profile" className="flex items-center gap-3 group">
            <Avatar
              initials={post.createdBy?.fullName?.charAt(0) ?? "U"}
              bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
            />
            <div>
              <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                {post.createdBy?.fullName ?? "Unknown"}
              </span>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Title */}
        <p className="font-bold text-gray-900 text-sm mb-1">{post.title}</p>

        {/* Description */}
        <div className="block text-sm text-gray-700 leading-relaxed mb-3 hover:text-gray-900 transition-colors">
          {post.description?.split(" ").map((word: string, i: number) =>
            word.startsWith("#") ? (
              <span key={i} className="text-indigo-500 font-semibold">
                {word}{" "}
              </span>
            ) : (
              word + " "
            ),
          )}
        </div>
      </div>

      {/* Image */}
      {post.media && (
        // <Link href={`/feed/post/${post._id}`} className="block">
        <img
          src={post.media}
          alt=""
          className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
        />
        // </Link>
      )}

      <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
        <div className="flex items-center gap-5">
          {/* ✅ use post.isLikedByMe from API, not local state */}
          <button
            onClick={() => toggleLike(post._id)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              post.isLikedByMe
                ? "text-rose-500"
                : "text-gray-400 hover:text-rose-400"
            }`}
          >
            <Heart
              size={16}
              fill={post.isLikedByMe ? "currentColor" : "none"}
            />
            {post.likesCount}
          </button>
          {/* <Link
            href={`/feed/post/${post._id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-indigo-500 transition-colors"
          > */}
          <MessageCircle size={16} /> {post.commentCount}
          {/* </Link> */}
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
}
