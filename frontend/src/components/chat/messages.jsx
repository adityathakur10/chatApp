import React, { useMemo, useRef, useState, useEffect } from "react";
import Msg from "./msg";
import { useConversationContext } from "../../context/ConversationContext";
import { Send } from "lucide-react";
import { assets } from "../../assets/assets";
import useChat from "../../hooks/useChat";

const Chat = () => {
  const { selectedConversation, conversationId, loadingMessages } = useConversationContext();
  const { messages, sendMessage, sending } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const otherUser = useMemo(
    () =>
      selectedConversation || {
        username: "Select a user to chat with",
        profilePic: "https://avatar.iran.liara.run/public/girl",
      },
    [selectedConversation]
  );

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loadingMessages]);

  const showEmptyState = !selectedConversation && !conversationId;

  return (
    <div
      className="relative p-3 h-full bg-gray-100 rounded-3xl shadow-md text-ink flex flex-col"
      style={{
        backgroundImage: assets.bg
          ? `linear-gradient(rgba(170,170,170,0.9), rgba(170,170,170,0.9)), url(${assets.bg})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxSizing: "border-box",
      }}
    >
      <div className="absolute font-medium text-2xl px-6 py-6 w-full flex-none left-0 top-0 z-10 bg-surface-2/45 overflow-hidden rounded-xl backdrop-blur-md">
        {otherUser.username ? `Chat with ${otherUser.username}` : "Group chat"}
      </div>

      <div
        ref={scrollRef}
        className={`flex-1 flex flex-col gap-4 overflow-y-auto px-4 py-2 pt-24 pb-24 scrollbar-hidden ${
          showEmptyState ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {loadingMessages ? (
          <div className="flex justify-center items-center text-ink/60 py-4">
            Loading messages...
          </div>
        ) : messages.length ? (
          messages.map((m) => <Msg key={m._id || m.timestamp} message={m} otherUser={otherUser} />)
        ) : (
          <div className="flex flex-col items-center justify-center text-ink/60 py-10">
            <p>No messages yet. Say hi!</p>
          </div>
        )}
      </div>

      {showEmptyState && (
        <div className="absolute inset-x-6 inset-y-24 flex flex-col items-center justify-center rounded-2xl bg-surface-2/10 backdrop-blur-xl border border-muted text-center text-ink/70 space-y-3">
          <div className="text-4xl">??</div>
          <h2 className="text-xl font-semibold text-ink">Select a conversation</h2>
          <p className="max-w-xs text-sm">
            Use the search above or pick a contact from the list to start chatting.
          </p>
        </div>
      )}

      <div className="relative flex items-center gap-x-4 p-4 flex-none">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 h-14 pl-4 pr-16 rounded-xl bg-surface-2 border border-muted shadow focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending}
          className="absolute right-7 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand text-white shadow disabled:opacity-60"
        >
          <Send className="text-white h-5 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
