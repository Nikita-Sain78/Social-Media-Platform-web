"use client";

import { useState, useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuth";
import { useCreatePost } from "@/hooks/usePost";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { authUser } = useAuthUser();
  const { mutate: createPostData } = useCreatePost();
  console.log(authUser);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    createPostData({
      description: text,
      media: image ?? undefined,
    });
    setText("");
    setImage(null);
  };

  return (
    <div className="mx-autp max-w-6xl">
      <div className="max-w-2xl  px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Post</h1>
        <p className="text-sm text-gray-400 mb-6">
          Share your thoughts with the world
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          {/* Author row */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              GS
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">
                {authUser.fullName}
              </p>
              <p className="text-xs text-gray-400">{authUser?.email}k</p>
            </div>
          </div>

          {/* Text area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="w-full resize-none outline-none text-sm text-gray-700 placeholder-gray-300 leading-relaxed bg-transparent"
          />

          {/* Image preview */}
          {image && (
            <div className="relative mt-3 rounded-xl overflow-hidden">
              <img
                src={image}
                alt="preview"
                className="w-full max-h-60 object-cover rounded-xl"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={14} color="#fff" />
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
            {/* Image upload */}
            <button
              onClick={() => fileRef.current?.click()}
              className="text-gray-400 hover:text-indigo-500 transition-colors p-1 rounded-lg hover:bg-indigo-50"
              title="Add image"
            >
              <ImageIcon size={20} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            {/* Publish */}
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
