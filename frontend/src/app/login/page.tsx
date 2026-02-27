// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginPage from "../../pages/LoginPage";
import { useAuthUser } from "@/hooks/useAuth";

export default function Login() {
  const { authUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser, router]);

  if (authUser) return null;

  return <LoginPage />;
}
