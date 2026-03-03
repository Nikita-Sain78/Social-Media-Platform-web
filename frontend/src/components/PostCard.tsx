// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import {
//   Heart,
//   MessageCircle,
//   Bookmark,
//   MoreHorizontal,
//   Trash2,
// } from "lucide-react";
// import Avatar from "./Avatar";
// import {
//   useAddComment,
//   useDeleteComment,
//   useGetComments,
//   useGetPost,
//   useToggleLike,
// } from "@/hooks/usePost";
// import { useAuthUser } from "@/hooks/useAuth";

// export default function PostCard({ post }: { post: any }) {
//   // const [saved, setSaved] = useState(false);
//   const [isLiked, setIsLiked] = useState(post.isLikedByMe);
//   const [likesCount, setLikesCount] = useState(post.likesCount);
//   const [text, setText] = useState("");
//   const authUser = useAuthUser();
//   const auth = authUser.authUser;
//   const { mutate: toggleLike } = useToggleLike();
//   const { data: singlePost } = useGetPost(post._id);
//   const { mutate: addComment } = useAddComment();
//   const { data: comments } = useGetComments(post._id);
//   const { mutate: deleteComment } = useDeleteComment();
//   console.log(singlePost);
//   const handleSubmit = (postId: any, text: any) => {
//     addComment({ postId, text });
//     setText(" ");
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
//       <div className="p-5">
//         <div className="flex items-center justify-between mb-3">
//           <Link href="/profile" className="flex items-center gap-3 group">
//             <Avatar
//               initials={post.userName?.charAt(0) ?? "U"}
//               bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
//             />
//             <div>
//               <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
//                 {post.userName ?? "unknown"}
//               </span>
//               <p className="text-xs text-gray-400">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </Link>
//           <button className="text-gray-400 hover:text-gray-600">
//             <MoreHorizontal size={18} />
//           </button>
//         </div>

//         {/* Title */}
//         <p className="font-bold text-gray-900 text-sm mb-1">{post.title}</p>

//         {/* Description */}
//         <div className="block text-sm text-gray-700 leading-relaxed mb-3 hover:text-gray-900 transition-colors">
//           {post.description?.split(" ").map((word: string, i: number) =>
//             word.startsWith("#") ? (
//               <span key={i} className="text-indigo-500 font-semibold">
//                 {word}{" "}
//               </span>
//             ) : (
//               word + " "
//             ),
//           )}
//         </div>
//       </div>

//       {/* Image */}
//       {post.media && (
//         // <Link href={`/feed/post/${post._id}`} className="block">
//         <img
//           src={post.media}
//           alt=""
//           className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
//         />
//         // </Link>
//       )}

//       <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
//         <div className="flex items-center gap-5">
//           {/* ✅ use post.isLikedByMe from API, not local state */}
//           <button
//             onClick={() => toggleLike(post._id)}
//             className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
//               post.isLikedByMe
//                 ? "text-rose-500"
//                 : "text-gray-400 hover:text-rose-400"
//             }`}
//           >
//             <Heart
//               size={16}
//               fill={post.isLikedByMe ? "currentColor" : "none"}
//             />
//             {post.likesCount}
//           </button>
//           <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-indigo-500 transition-colors">
//             <MessageCircle size={16} /> {post.commentCount}
//           </div>
//         </div>

//         {/* <button
//           onClick={() => setSaved(!saved)}
//           className={`transition-colors ${saved ? "text-amber-500" : "text-gray-400 hover:text-amber-400"}`}
//         >
//           <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
//         </button> */}
//       </div>
//       {/* Comment Input */}
//       <div className="px-5 py-3 border-t border-gray-100">
//         <div className="flex items-center gap-2">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSubmit(post._id, text)}
//             type="text"
//             placeholder="Write a comment..."
//             className="flex-1 bg-gray-50 border border-gray-200 rounded-full h-8 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 transition"
//           />
//           <button
//             onClick={() => handleSubmit(post._id, text)}
//             disabled={!text.trim()}
//             className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full h-8 px-4 text-xs font-semibold transition-colors"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//       {comments && comments.length > 0 && (
//         <div className="px-5 pb-4 flex flex-col gap-2">
//           {comments.map((c: any) => (
//             <div key={c._id} className="flex items-start gap-2">
//               <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
//                 {c.commentedBy?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
//               </div>
//               <div className="bg-gray-50 rounded-2xl px-3 py-2 flex-1">
//                 <div className="flex items-center justify-between mb-0.5">
//                   <span className="text-xs font-semibold text-gray-800">
//                     {c.commentedBy?.fullName ?? "Unknown"}
//                   </span>
//                   <div className="flex flex-col-reverse items-center gap-2">
//                     <span className="text-[10px] text-gray-400">
//                       {new Date(c.commentedAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                     {/* ✅ show delete if current user wrote the comment OR owns the post */}
//                     {auth?._id === post.createdBy && (
//                       <button
//                         onClick={() =>
//                           deleteComment({ commentId: c._id, postId: post._id })
//                         }
//                         className="text-[10px] text-rose-400 hover:text-rose-600 transition-colors font-medium"
//                       >
//                         <Trash2 className="size-3" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-600">{c.comment}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import Avatar from "./Avatar";
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
  useToggleLike,
} from "@/hooks/usePost";
import { useAuthUser } from "@/hooks/useAuth";
import { useState } from "react";

export default function PostCard({ post }: { post: any }) {
  const { authUser: auth } = useAuthUser();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: addComment } = useAddComment();
  const { data: comments } = useGetComments(post._id);
  const { mutate: deleteComment } = useDeleteComment();
  const [text, setText] = useState("");

  const handleSubmit = (postId: any, text: any) => {
    if (!text.trim()) return;
    addComment({ postId, text });
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Link href="/profile" className="flex items-center gap-3 group">
            <Avatar
              initials={post.userName?.charAt(0) ?? "U"}
              bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
            />
            <div>
              <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                {post.userName ?? "unknown"}
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

        <p className="font-bold text-gray-900 text-sm mb-1">{post.title}</p>

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

      {post.media && (
        <img
          src={post.media}
          alt=""
          className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
        />
      )}

      <div className="px-5 py-3 flex items-center justify-between border-t border-gray-50">
        <div className="flex items-center gap-5">
          {/* ✅ Driven purely by post prop from React Query cache */}
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

          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-indigo-500 transition-colors">
            <MessageCircle size={16} /> {post.commentCount}
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="px-5 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(post._id, text)}
            type="text"
            placeholder="Write a comment..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full h-8 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 transition"
          />
          <button
            onClick={() => handleSubmit(post._id, text)}
            disabled={!text.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full h-8 px-4 text-xs font-semibold transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      {comments && comments.length > 0 && (
        <div className="px-5 pb-4 flex flex-col gap-2">
          {comments.map((c: any) => (
            <div key={c._id} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {c.commentedBy?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
              </div>
              <div className="bg-gray-50 rounded-2xl px-3 py-2 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-gray-800">
                    {c.commentedBy?.fullName ?? "Unknown"}
                  </span>
                  <div className="flex flex-col-reverse items-center gap-2">
                    <span className="text-[10px] text-gray-400">
                      {new Date(c.commentedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {auth?._id === post.createdBy && (
                      <button
                        onClick={() =>
                          deleteComment({ commentId: c._id, postId: post._id })
                        }
                        className="text-[10px] text-rose-400 hover:text-rose-600 transition-colors font-medium"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-600">{c.comment}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
