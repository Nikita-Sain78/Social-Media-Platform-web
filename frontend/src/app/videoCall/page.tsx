// app/videoCall/page.tsx
"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import VideoCallPage from "../../pages/VideoCallPage";

export default function VideoCall() {
  const { authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [authUser, router]);

  if (!authUser) return null;

  return <VideoCallPage />;
}
