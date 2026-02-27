// // // // app/ClientLayout.tsx
// // // "use client";

// // // import { ReactNode, useEffect } from "react";
// // // import Navbar from "../components/Navbar";
// // // import { Toaster } from "react-hot-toast";
// // // import { useAuthStore } from "../store/useAuthStore";
// // // import { useThemeStore } from "../store/useThemeStore";
// // // import { Loader } from "lucide-react";

// // // export default function ClientLayout({ children }: { children: ReactNode }) {
// // //   const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

// // //   useEffect(() => {
// // //     checkAuth();
// // //   }, [checkAuth]);

// // //   if (isCheckingAuth && !authUser)
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <Loader className="h-10 w-10 animate-spin" />
// // //       </div>
// // //     );

// // //   return (
// // //     <html lang="en">
// // //       <body>
// // //         <Navbar />
// // //         {children}
// // //         <Toaster />
// // //       </body>
// // //     </html>
// // //   );
// // // }

// // // app/ClientLayout.tsx
// // "use client";

// // import { ReactNode, useEffect } from "react";
// // import Navbar from "../components/Navbar";
// // import { Toaster } from "react-hot-toast";
// // import { useAuthStore } from "../store/useAuthStore";
// // import { Loader } from "lucide-react";
// // import { useThemeStore } from "@/store/useThemeStore";

// // export default function ClientLayout({ children }: { children: ReactNode }) {
// //   const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
// //   useEffect(() => {
// //     checkAuth();
// //   }, [checkAuth]);

// //   if (isCheckingAuth && !authUser) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <Loader className="h-10 w-10 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <Navbar />
// //       {children}
// //       <Toaster />
// //     </>
// //   );
// // }

// "use client";

// import { ReactNode, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useAuthUser } from "@/hooks/useAuth";
// import { Loader } from "lucide-react";
// import { useThemeStore } from "@/store/useThemeStore";

// export default function ClientLayout({ children }: { children: ReactNode }) {
//   // const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
//   const { theme, setTheme } = useThemeStore();
//   const { authUser } = useAuthUser();

//   // Auth check
//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   // Apply saved theme on mount
//   useEffect(() => {
//     const savedTheme = sessionStorage.getItem("chat-theme") || "light";
//     setTheme(savedTheme);
//   }, [setTheme]);

//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="h-10 w-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       {children}
//       <Toaster />
//     </>
//   );
// }

// "use client";

// import { ReactNode, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Toaster } from "react-hot-toast";
// import { useAuthUser } from "@/hooks/useAuth";
// import { useThemeStore } from "@/store/useThemeStore";
// import { Loader } from "lucide-react";

// export default function ClientLayout({ children }: { children: ReactNode }) {
//   // ✅ useAuthUser internally calls useCheckAuth (useQuery)
//   // it auto-runs on mount — no need to call checkAuth() manually
//   const { authUser, isCheckingAuth } = useAuthUser();
//   const { setTheme } = useThemeStore();

//   // Apply saved theme on mount
//   useEffect(() => {
//     const savedTheme = sessionStorage.getItem("chat-theme") || "light";
//     setTheme(savedTheme);
//   }, [setTheme]);

//   // Show spinner while checking auth
//   if (isCheckingAuth && !authUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="h-10 w-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       {children}
//       <Toaster />
//     </>
//   );
// }

// app/clientLayout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/useThemeStore";
import { Loader } from "lucide-react";

// ── Inner component — can safely use useQuery hooks here
// because it's already inside QueryClientProvider
function AppContent({ children }: { children: ReactNode }) {
  const { authUser, isCheckingAuth } = useAuthUser();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("chat-theme") || "light";
    setTheme(savedTheme);
  }, [setTheme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
}

// ── Outer component — sets up QueryClientProvider first
export default function ClientLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent>{children}</AppContent>
    </QueryClientProvider>
  );
}
