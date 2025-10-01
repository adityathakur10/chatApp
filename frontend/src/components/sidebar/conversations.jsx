import React from "react";
import Conversation from "./conversation";
import useGetConversations from "../../hooks/useGetConversations";

const dummyConversations = [
  {
    _id: "1",
    username: "Aditya Thakur",
    profilePic: "https://avatar.iran.liara.run/public/boy",
    lastmessage: {
      content: "Hey, what's up?",
      timestamp: "2025-09-30T10:45:00.000Z", // An ISO date string
    },
  },
  {
    _id: "2",
    username: "Jane Smith",
    profilePic: "https://avatar.iran.liara.run/public/girl",
    lastmessage: {
      content: "See you tomorrow!",
      timestamp: "2025-09-30T09:15:00.000Z",
    },
  },
  {
    _id: "3",
    username: "Bob Johnson",
    profilePic: "https://avatar.iran.liara.run/public/boy?username=bob",
    lastmessage: {
        content: "Okay, sounds good.",
        timestamp: "2025-09-29T15:30:00.000Z",
    },
  },
];

const Conversations=()=>{
    // const {loading,conversations}=useGetConversations();
    const loading=false;
    const conversations=dummyConversations;
    return (
        <div className="flex flex-col flex-1 py-2 px-4 h-full overflow-y-auto space-y-4">
            {conversations.map((conversation) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
         
        </div>
    )
}

export default Conversations;