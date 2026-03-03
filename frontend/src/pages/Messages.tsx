"use client";
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Messages = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="bg-base-200 overflow-hidden">
      <div className="flex items-center justify-center ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden ">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messages;
