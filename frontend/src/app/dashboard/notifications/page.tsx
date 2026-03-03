"use client";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { useGetUsers } from "@/hooks/useChat";
import {
  useAcceptFollowRequest,
  useFollowUser,
  useGetFollowRequests,
  useRejectFollowRequest,
} from "@/hooks/useFollow";

function UserCard({ c }: { c: any }) {
  const { mutate: followUser, isPending } = useFollowUser();
  const { data: getFollowRequests } = useGetFollowRequests();
  const { mutate: acceptFollowRequest } = useAcceptFollowRequest();
  const { mutate: declineFollowRequest } = useRejectFollowRequest();
  console.log(getFollowRequests, "getFollowRequest");
  const acceptFollowRequests = (acceptId: string, followId: string) => {
    acceptFollowRequest(acceptId);
    followUser(followId);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <Link
        href={`/connections/profile/${c._id}`}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold text-lg mb-3">
          {c.from.profilePic ? (
            <img
              src={c.from.profilePic}
              alt={c.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            c.from.fullName?.charAt(0).toUpperCase()
          )}
        </div>
        <p className="font-bold text-gray-900 text-sm hover:text-indigo-600 transition-colors">
          {c.from.fullName}
        </p>
      </Link>
      <p className="text-xs text-gray-400 mb-1">{c.handle}</p>
      <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-3">
        {c.field}
      </span>

      <div className="flex gap-5">
        <button
          className="w-full flex items-center justify-center gap-1.5 py-2 px-4 not-only:rounded-xl text-xs font-bold text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          onClick={() => acceptFollowRequests(c._id, c.from._id)}
          disabled={isPending}
        >
          <UserPlus size={13} />{" "}
          {isPending ? "Connecting..." : "Accept and follow"}
        </button>
        <button
          className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          onClick={() => declineFollowRequest(c._id)}
          disabled={isPending}
        >
          <UserPlus size={13} /> {isPending ? "Connecting..." : "Decline"}
        </button>
      </div>
    </div>
  );
}

export default function ConnectionsPage() {
  const { data: users } = useGetFollowRequests();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-gray-900 text-lg">People you may know</h2>
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search people…"
            className="pl-8 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-xs outline-none placeholder-gray-300 focus:border-indigo-300 w-44"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {users?.map((c) => (
          <UserCard key={c._id} c={c} />
        ))}
      </div>
    </div>
  );
}
