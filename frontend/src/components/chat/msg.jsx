import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Msg = ({ message, otherUser }) => {
  const { authUser } = useAuthContext();
  const myId = authUser?._id;
  const myName = authUser?.username;

  const isOwn = message?.from === myId || message?.from === myName;
  const ts = message?.timestamp ? new Date(message.timestamp) : new Date();
  const time = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const myAvatar = authUser?.profilePicture && authUser.profilePicture.trim()
    ? authUser.profilePicture
    : `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(myName || "me")}`;

  const otherAvatar = otherUser?.profilePic && otherUser.profilePic.trim()
    ? otherUser.profilePic
    : `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(otherUser?.username || "user")}`;

  const avatar = isOwn ? myAvatar : otherAvatar;
  const name = isOwn ? "You" : otherUser?.username || message?.from || "User";

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img alt={name} src={avatar} />
        </div>
      </div>

      <div className={`chat-bubble text-base ${isOwn ? "bg-brand text-white" : "bg-white text-ink"}`}>
        <div className="chat-header flex items-center justify-between text-sm font-medium mb-1">
          <span>{name}</span>
          <time className="text-xs opacity-70 ml-2">{time}</time>
        </div>
        <div>{message?.content}</div>
      </div>
    </div>
  );
};

export default Msg;
