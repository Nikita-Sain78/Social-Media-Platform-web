"use client";
import { UserCheck, Users } from "lucide-react";

export default function NoFollowRequests() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 transition-all duration-700 ">
      {/* Illustration */}
      <div className="relative mb-8">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-100 blur-2xl scale-150 opacity-60" />

        {/* Main icon */}
        <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-indigo-200">
          <Users size={44} className="text-white" strokeWidth={1.5} />

          {/* Check badge */}
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-indigo-400 flex items-center justify-center shadow-md">
            <UserCheck size={13} className="text-indigo-600" />
          </div>
        </div>

        {/* Floating dots */}
        <div className="absolute -bottom-2 -left-3 w-4 h-4 rounded-full bg-indigo-300 opacity-70" />
        <div className="absolute top-1 -right-5 w-3 h-3 rounded-full bg-indigo-300 opacity-50" />
      </div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
        No follow requests
      </h3>
      <p className="text-sm text-gray-400 text-center max-w-xs leading-relaxed">
        When someone wants to follow you, their request will show up here.
      </p>
    </div>
  );
}
