// import { useRef, useState, useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { Image, Send, X } from "lucide-react";
// import toast from "react-hot-toast";
// import { useSocketStore } from "@/store/useAuthStore";
// import { useAuthUser } from "@/hooks/useAuth";
// // import { useAuthStore } from "../store/useAuthStore";

// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   const fileInputRef = useRef(null);
//   const typingTimeout = useRef(null);
//   const isTyping = useRef(false);

//   const { sendMessage, selectedUser } = useChatStore();
//   const { socket } = useAuthUser();
//   // ---------------- Image handling ----------------
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // ---------------- Send message ----------------
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview) return;

//     try {
//       await sendMessage({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       setText("");
//       setImagePreview(null);
//       fileInputRef.current && (fileInputRef.current.value = "");

//       socket?.emit("stopTyping", {
//         senderId: authUser._id,
//         receiverId: selectedUser._id,
//       });
//       isTyping.current = false;
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   // ---------------- Typing logic ----------------
//   const handleTyping = (e) => {
//     const value = e.target.value;
//     setText(value);

//     if (!socket || !selectedUser) return;

//     if (!isTyping.current && value.trim()) {
//       socket.emit("typing", {
//         senderId: authUser._id,
//         receiverId: selectedUser._id,
//       });
//       isTyping.current = true;
//     }
//     console.log(authUser._id, selectedUser._id);

//     clearTimeout(typingTimeout.current);

//     typingTimeout.current = setTimeout(() => {
//       socket.emit("stopTyping", {
//         senderId: authUser._id,
//         receiverId: selectedUser._id,
//       });
//       isTyping.current = false;
//     }, 1000);
//   };

//   // ---------------- Cleanup on unmount ----------------
//   useEffect(() => {
//     return () => {
//       clearTimeout(typingTimeout.current);
//       if (isTyping.current && socket && selectedUser) {
//         socket.emit("stopTyping", {
//           senderId: authUser._id,
//           receiverId: selectedUser._id,
//         });
//       }
//     };
//   }, [socket, selectedUser, authUser]);

//   return (
//     <div className="p-4 w-full">
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
//             />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
//             >
//               <X className="size-3" />
//             </button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div className="flex-1 flex gap-2">
//           <input
//             type="text"
//             className="w-full input input-bordered rounded-full input-sm sm:input-md "
//             placeholder="Type a message..."
//             value={text}
//             onChange={handleTyping}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//           />

//           <button
//             type="button"
//             className={`hidden sm:flex btn btn-circle ${
//               imagePreview ? "text-emerald-500" : "text-zinc-400"
//             }`}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Image size={20} className="text-black" />
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-sm btn-circle"
//           disabled={!text.trim() && !imagePreview}
//         >
//           <Send size={22} className="text-black" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;

"use client";

import { useRef, useState, useEffect } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "@/store/useChatStore";
import { useSocketStore } from "@/store/useAuthStore"; // ✅ socket lives here
import { useAuthUser } from "@/hooks/useAuth"; // ✅ authUser lives here
import { useSendMessage } from "@/hooks/useChat"; // ✅ sendMessage is now a mutation

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTyping = useRef(false);

  // ✅ socket from useSocketStore — not useAuthUser
  const { socket } = useSocketStore();

  // ✅ authUser from useAuthUser
  const { authUser } = useAuthUser();

  // ✅ selectedUser from useChatStore
  const { selectedUser } = useChatStore();

  // ✅ sendMessage is now a mutation — use mutateAsync to await it
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

  // ── Image handling ──────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Send message ────────────────────────────────────────────
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview ?? undefined,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Stop typing indicator on send
      if (socket && authUser && selectedUser) {
        socket.emit("stopTyping", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });
        isTyping.current = false;
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // ── Typing indicator ────────────────────────────────────────
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (!socket || !selectedUser || !authUser) return;

    // Emit typing start only once
    if (!isTyping.current && value.trim()) {
      socket.emit("typing", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
      isTyping.current = true;
    }

    // Reset the stop-typing timer on every keystroke
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
      isTyping.current = false;
    }, 1000);
  };

  // ── Cleanup on unmount ──────────────────────────────────────
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      if (isTyping.current && socket && authUser && selectedUser) {
        socket.emit("stopTyping", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });
      }
    };
  }, [socket, selectedUser, authUser]);

  return (
    <div className="p-4 w-full">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-full input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={handleTyping}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} className="text-black" />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isSending}
        >
          <Send size={22} className="text-black" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
