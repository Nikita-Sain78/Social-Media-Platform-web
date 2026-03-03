"use client";
import { useState, useEffect } from "react";
import { PenLine, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoPostsYet() {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col items-center justify-center  px-6 transition-all duration-700 
      }`}
    >
      {/* Illustration */}
      <div className="relative mb-8">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-100 blur-2xl scale-150 opacity-60" />

        {/* Icon container */}
        <button
          className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-200"
          onClick={() => {
            router.push("/dashboard/create-post");
          }}
        >
          <Plus size={44} className="text-white" strokeWidth={1.5} />

          {/* Sparkle top right */}
        </button>

        {/* Floating dots */}
        <div className="absolute -bottom-2 -left-3 w-4 h-4 rounded-full bg-violet-300 opacity-80" />
        <div className="absolute top-2 -right-5 w-3 h-3 rounded-full bg-indigo-300 opacity-60" />
      </div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
        No posts yet
      </h3>
      <p className="text-sm text-gray-400 text-center max-w-xs leading-relaxed mb-8">
        Be the first to share something. Your thoughts, ideas, and moments
        deserve to be seen.
      </p>
    </div>
  );
}
