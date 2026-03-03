"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashBoardSidebar from "@/components/DashBoardSideBar";
import { useAuthUser } from "@/hooks/useAuth";

export default function Home() {
  const { authUser, isCheckingAuth } = useAuthUser();
  const router = useRouter();
  console.log(authUser, "authUser");

  useEffect(() => {
    if (isCheckingAuth) return;

    if (!authUser) {
      router.push("/login");
    }
  }, [authUser, isCheckingAuth, router]);

  if (isCheckingAuth) return null;
  if (!authUser) return null;
  return <DashBoardSidebar />;
}
