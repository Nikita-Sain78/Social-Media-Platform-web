"use client";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { useGetUsers } from "@/hooks/useChat";

export default function ConnectionsPage() {
  const { data: users } = useGetUsers();

  return (
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
            className="pl-8 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-xs outline-none placeholder-gray-300 focus:border-indigo-300 w-44"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {users?.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            {/* Clicking name/avatar → /connections/profile/[id] — URL changes */}
            <Link
              href={`/connections/profile/${c.id}`}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3"
                style={{ background: c.profilePic }}
              >
                {c.profilePic}
              </div>
              <p className="font-bold text-gray-900 text-sm hover:text-indigo-600 transition-colors">
                {c.fullName}
              </p>
            </Link>
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
}
