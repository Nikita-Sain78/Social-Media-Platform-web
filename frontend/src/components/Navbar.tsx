import Link from "next/link";
// import { useAuthStore } from "../store/useAuthStore";
import { Bell, MessageSquare } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuth";
import { useGetFollowRequests } from "@/hooks/useFollow";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { data: getFollowRequests } = useGetFollowRequests();
  return (
    <header
      className="bg-base-100 border-b border-base-300 w-full top-0 z-40 
    backdrop-blur-lg fixed "
    >
      <div className="container mx-auto px-5 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard/feed"
              className="flex items-center gap-8 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold font-serif text-indigo-600">
                Chatterly
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex relative ">
              {" "}
              <div>
                {" "}
                <Link href="/dashboard/notifications">
                  <Bell className="text-indigo-600 size-4" />
                </Link>
              </div>
              {getFollowRequests?.length > 0 && (
                <div className="bottom-2 left-4 absolute">
                  {" "}
                  <span className="font-medium text-indigo-600 text-xs">
                    {getFollowRequests.length}
                  </span>
                </div>
              )}
            </div>
            {authUser && (
              <>
                <div className="flex items-center justify-center">
                  <Link href={"/edit-profile"}>
                    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white  text-lg">
                      {" "}
                      {authUser.profilePic ? (
                        <img
                          src={authUser.profilePic}
                          alt={authUser.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        authUser.fullName?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
