// components/BottomNav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Users, Compass, User } from "lucide-react";

const NAV = [
  { href: "/feed", icon: Home },
  { href: "/messages", icon: MessageSquare },
  { href: "/connections", icon: Users },
  { href: "/discover", icon: Compass },
  { href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 z-30">
      {NAV.map(({ href, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition-colors ${active ? "text-indigo-500" : "text-gray-400"}`}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </nav>
  );
}
