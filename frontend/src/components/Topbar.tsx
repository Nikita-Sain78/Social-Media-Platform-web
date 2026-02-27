// components/Topbar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ArrowLeft } from "lucide-react";
import Avatar from "./Avatar";

function getTitle(p: string) {
  if (p === "/feed") return "Feed";
  if (p === "/messages") return "Messages";
  if (p === "/connections") return "Connections";
  if (p === "/discover") return "Discover";
  if (p === "/profile") return "Profile";
  if (p.startsWith("/feed/post/")) return "Post";
  if (p.startsWith("/connections/profile/")) return "Profile";
  return "";
}

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const showBack =
    pathname.startsWith("/feed/post/") ||
    pathname.startsWith("/connections/profile/");

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center gap-3">
      {showBack && (
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 mr-1"
        >
          <ArrowLeft size={17} />
        </button>
      )}

      <h1 className="font-extrabold text-gray-900 text-base tracking-tight flex-1">
        {getTitle(pathname)}
      </h1>

      {/* Shows the real live URL */}
      <span className="hidden sm:flex items-center gap-1 text-xs font-mono bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-lg">
        <span className="text-indigo-400">localhost:3000</span>
        <span className="text-gray-400">{pathname}</span>
      </span>

      <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-500 transition-colors">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
      </button>

      <Link href="/profile">
        <Avatar
          initials="ME"
          bg="linear-gradient(135deg,#6366f1,#8b5cf6)"
          size="w-8 h-8"
          textSize="text-xs"
        />
      </Link>
    </header>
  );
}
