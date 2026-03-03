"use client";

import { useAuthUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // Auth check (runs automatically on mount)
  const { authUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      router.push("/dashboard/feed");
    }
  }, [authUser, router]);

  return null;
}
