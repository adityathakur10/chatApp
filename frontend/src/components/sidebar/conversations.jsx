import React from "react";
import Conversation from "./conversation";
import useGetConversations from "../../hooks/useGetConversations";

// Single, themed placeholder conversation until backend data is wired
const dummyConversations = [
  {
    _id: "1",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "7",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "6",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "5",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "4",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "3",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
  {
    _id: "2",
    username: "Sandra Perry",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "Hello! I’ll be useful to you if you decide to hire me.",
      timestamp: new Date().toISOString(),
    },
  },
];

const Conversations = ({ conversations = dummyConversations, loading = false }) => {
  return (
    <div className="flex flex-col flex-1 py-2 px-4 h-full overflow-y-auto space-y-2">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
}

export default Conversations;
