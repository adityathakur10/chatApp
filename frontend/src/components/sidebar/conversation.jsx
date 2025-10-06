import React from "react";
import { useConversationContext } from "../../context/ConversationContext";

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
};

const Conversation = ({ conversation }) => {
  const { setSelectedConversation, conversationId } = useConversationContext();

  const handleSelect = () => {
    if (!conversation?.otherUser) return;
    setSelectedConversation({
      _id: conversation.otherUser._id,
      username: conversation.otherUser.username,
      profilePic: conversation.otherUser.profilePicture,
    });
  };

  const lastMessage = conversation.lastMessage || {};
  const isActive = conversationId === conversation._id;

  return (
    <div
      onClick={handleSelect}
      className={`flex items-center rounded-xl p-2 cursor-pointer transition-colors ${
        isActive ? "bg-surface" : "hover:bg-surface"
      }`}
    >
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src=
              {conversation.otherUser?.profilePicture ||
                "https://avatar.iran.liara.run/public/girl"}
            alt={conversation.otherUser?.username || "user"}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between px-2">
          <p className="font-medium text-lg text-ink">
            {conversation.otherUser?.username || "Unknown"}
          </p>
          <span className="text-sm text-ink/80">
            {formatTime(lastMessage.timestamp)}
          </span>
        </div>
        <div className="text-sm text-ink/60 px-2 truncate">
          <p>{lastMessage.content || "Start a conversation"}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
