"use client";
import { useEffect, type ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import DashBoardSidebar from "@/components/DashBoardSideBar";
import Topbar from "@/components/Topbar";
import BottomNav from "@/components/BottomNav";
import { useAuthUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isCheckingAuth, authUser } = useAuthUser();

  const router = useRouter();

  if (!authUser) {
    router.push("/login");
  }
  useEffect(() => {
    if (isCheckingAuth) return;

    if (!authUser) {
      router.push("/login");
    } else {
      router.push("/dashboard/feed");
    }
  }, [authUser, isCheckingAuth, router]);

  return (
    // <html lang="en">
    //   <head>
    //     <link
    //       href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    //       rel="stylesheet"
    //     />
    //   </head>
    //   <body
    //     style={{
    //       fontFamily: "'Plus Jakarta Sans',sans-serif",
    //       margin: 0,
    //       background: "#f9fafb",
    //     }}
    //   >
    <div className="min-h-screen flex bg-gray-50">
      {/* Fixed sidebar — always visible */}
      <DashBoardSidebar />

      {/* Right of sidebar */}
      <main className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Sticky topbar — always visible */}
        <Topbar />

        <div className="flex-1 p-5 md:p-6 pb-20 md:pb-6 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>

    //     <style>{`
    //       ::-webkit-scrollbar { width: 4px; }
    //       ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
    //     `}</style>
    //   </body>
    // </html>
  );
}
