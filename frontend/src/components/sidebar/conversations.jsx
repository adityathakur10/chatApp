import React from "react";
import Conversation from "./conversation";
import useConversations from "../../hooks/useConversations";

const Conversations = () => {
  const { conversations, loading } = useConversations();

  return (
    <div className="flex flex-col flex-1 py-2 px-4 h-full overflow-y-auto space-y-2">
      {loading && conversations.length === 0 ? (
        <div className="flex justify-center py-6 text-ink/60">Loading conversations...</div>
      ) : conversations.length ? (
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-ink/60">
          <p>No conversations yet.</p>
          <p className="text-sm">Search for a user to start chatting.</p>
        </div>
      )}
      {loading && conversations.length > 0 ? (
        <span className="loading loading-spinner mx-auto" />
      ) : null}
    </div>
  );
};

export default Conversations;
