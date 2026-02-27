"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 min default
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

/*
─────────────────────────────────────────────────────
  MIGRATION GUIDE — old Zustand → new TanStack Query
─────────────────────────────────────────────────────

STEP 1 — Add QueryProvider to app/layout.tsx:

  import QueryProvider from "@/providers/QueryProvider";

  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <QueryProvider>          ← wrap here
            {children}
          </QueryProvider>
        </body>
      </html>
    );
  }


STEP 2 — Install packages:

  npm install @tanstack/react-query @tanstack/react-query-devtools


STEP 3 — Replace old usage in your components:

  OLD (Zustand):
  ──────────────
  const { authUser, isCheckingAuth, isLoggingIn, login, logout, signup, updateProfile } = useAuthStore();

  NEW (TanStack Query):
  ──────────────────────
  import { useAuthUser, useLogin, useLogout, useSignup, useUpdateProfile, useCheckAuth } from "@/hooks/useAuth";

  // Auth check (runs automatically on mount)
  const { authUser, isCheckingAuth } = useAuthUser();

  // Login
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  login({ email, password });

  // Signup
  const { mutate: signup, isPending: isSigningUp } = useSignup();
  signup({ fullName, email, password });

  // Logout
  const { mutate: logout } = useLogout();
  logout();

  // Update profile
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  updateProfile({ profilePic: base64string });

  // Online users + socket (still Zustand)
  const { onlineUsers } = useSocketStore();


STEP 4 — Auth guard in dashboard/layout.tsx:

  import { useAuthUser } from "@/hooks/useAuth";

  export default function DashboardLayout({ children }) {
    const { authUser, isCheckingAuth } = useAuthUser();
    const router = useRouter();

    useEffect(() => {
      if (!isCheckingAuth && !authUser) router.push("/login");
    }, [authUser, isCheckingAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;
    if (!authUser) return null;

    return <>{children}</>;
  }


WHY THIS IS BETTER:
───────────────────
✅ authUser is cached — no extra API call if already fetched
✅ isPending replaces manual isLoggingIn/isSigningUp booleans
✅ Cache is shared — update in one place, all components see it instantly
✅ DevTools — see all queries/mutations in real time
✅ Zustand only manages what it should: socket connection + online users
*/
