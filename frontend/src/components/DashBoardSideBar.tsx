// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  MessageSquare,
  Users,
  Compass,
  User,
  Plus,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

const NAV = [
  { href: "/dashboard/feed", label: "Feed", icon: Home },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  { href: "/dashboard/discover", label: "Discover", icon: Users },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashBoardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ mutate is the function to call, isPending for loading state
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 shadow-sm fixed top-0 left-0 h-full z-30 px-3 py-5">
      {/* Brand */}
      <Link href="/feed" className="flex items-center gap-2 px-3 mb-8">
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
      </Link>

      {/* Nav links — each is a real <Link> that changes the URL */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                ${active ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
            >
              <Icon
                size={18}
                className={active ? "text-indigo-500" : "text-gray-400"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard/create-post"
        className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all"
        style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
      >
        <Plus size={16} /> Create Post
      </Link>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 px-1">
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
        >
          ME
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-900 truncate">My Name</p>
          <p className="text-xs text-gray-400 truncate">@myhandle</p>
        </div>
        <button
          className="flex gap-2 items-center bg-black-100"
          onClick={handleLogout}
        >
          <LogOut className="size-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}
