// app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignUpPage from "@/pages/SignUpPage";
import { useAuthUser } from "@/hooks/useAuth";

export default function SignUp() {
  const { authUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser, router]);

  if (authUser) return null;

  return <SignUpPage />;
}
