// // app/messages/page.tsx
// // URL: localhost:3000/messages
// "use client";
// import { useState } from "react";
// import { Search, Phone, Video, Send } from "lucide-react";
// import Avatar from "@/components/Avatar";
// import { MESSAGES } from "@/lib/data";

// export default function MessagesPage() {
//   const [active, setActive] = useState(MESSAGES[0].id);
//   const activeMsg = MESSAGES.find((m) => m.id === active)!;

//   return (
//     <div
//       className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
//       style={{ height: "calc(100vh - 130px)" }}
//     >
//       {/* Inbox list */}
//       <div className="w-72 border-r border-gray-100 flex flex-col flex-shrink-0">
//         <div className="p-4 border-b border-gray-100">
//           <h2 className="font-bold text-gray-900 mb-3">Messages</h2>
//           <div className="relative">
//             <Search
//               size={13}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               placeholder="Search…"
//               className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 text-xs outline-none text-gray-700 placeholder-gray-300 border border-gray-100 focus:border-indigo-300"
//             />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {MESSAGES.map((m) => (
//             <button
//               key={m.id}
//               onClick={() => setActive(m.id)}
//               className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-colors ${active === m.id ? "bg-indigo-50 border-r-2 border-indigo-500" : "hover:bg-gray-50"}`}
//             >
//               <Avatar
//                 initials={m.avatar}
//                 bg={m.bg}
//                 size="w-10 h-10"
//                 textSize="text-sm"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-bold text-gray-900 truncate">
//                     {m.name}
//                   </p>
//                   <span className="text-xs text-gray-300 flex-shrink-0 ml-1">
//                     {m.time}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-400 truncate">{m.msg}</p>
//               </div>
//               {m.unread > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                   {m.unread}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chat panel */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar
//               initials={activeMsg.avatar}
//               bg={activeMsg.bg}
//               size="w-10 h-10"
//               textSize="text-sm"
//             />
//             <div>
//               <p className="font-bold text-gray-900 text-sm">
//                 {activeMsg.name}
//               </p>
//               <p className="text-xs text-emerald-500 font-semibold">● Online</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 text-gray-400">
//             <button className="hover:text-indigo-500 transition-colors">
//               <Phone size={18} />
//             </button>
//             <button className="hover:text-indigo-500 transition-colors">
//               <Video size={18} />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 p-5 flex flex-col justify-end gap-3 bg-gray-50/50 overflow-y-auto">
//           <div className="flex justify-end">
//             <div className="bg-indigo-500 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs shadow-sm">
//               Hey! How are things going?
//             </div>
//           </div>
//           <div className="flex gap-2 items-end">
//             <Avatar
//               initials={activeMsg.avatar}
//               bg={activeMsg.bg}
//               size="w-7 h-7"
//               textSize="text-xs"
//             />
//             <div className="bg-white text-gray-700 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs shadow-sm border border-gray-100">
//               {activeMsg.msg}
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t border-gray-100 flex items-center gap-3">
//           <input
//             placeholder="Type a message…"
//             className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-300 text-gray-700 placeholder-gray-300 transition-colors"
//           />
//           <button
//             className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
//             style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
//           >
//             <Send size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import Messages from "@/pages/Messages";
import React from "react";

const page = () => {
  return (
    <div>
      <Messages />
    </div>
  );
};

export default page;
