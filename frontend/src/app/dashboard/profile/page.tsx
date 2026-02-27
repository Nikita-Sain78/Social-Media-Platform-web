// app/profile/page.tsx
// URL: localhost:3000/profile
"use client";
import { Settings, MapPin } from "lucide-react";
import PostCard from "@/components/PostCard";
import { POSTS } from "@/lib/data";
import { useAuthUser } from "@/hooks/useAuth";
import { useGetMyPosts } from "@/hooks/usePost";

export default function ProfilePage() {
  const authUser = useAuthUser();
  const { data: myPosts } = useGetMyPosts();
  console.log(myPosts, "posts");
  console.log("authuser", authUser);
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
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
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
            >
              ME
            </div>
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5">
              <Settings size={13} /> Edit Profile
            </button>
          </div>
          <h2 className="font-extrabold text-gray-900 text-xl tracking-tight">
            {authUser.authUser.fullName}
          </h2>
          <p className="text-sm text-gray-400 mb-3">
            @myhandle · <MapPin size={11} className="inline" /> San Francisco,
            CA
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
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

      <h3 className="font-bold text-gray-900 text-sm px-1">My Posts</h3>
      {myPosts?.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}
