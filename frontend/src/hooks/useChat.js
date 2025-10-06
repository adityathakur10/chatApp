import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import useSocket from "./useSocket";
import { useAuthContext } from "../context/AuthContext";
import { useConversationContext } from "../context/ConversationContext";

export default function useChat() {
  const {
    selectedConversation,
    messages,
    setMessages,
    conversationId,
    setConversationId,
    loadingMessages,
    setLoadingMessages,
  } = useConversationContext();

  const socket = useSocket();
  const { authUser } = useAuthContext();
  const [sending, setSending] = useState(false);

  const fetchHistory = useCallback(
    async (convId) => {
      setLoadingMessages(true);
      try {
        const { data } = await axios.get(`/api/conv/${convId}/messages`, {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("fetching history error", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    },
    [authUser?.token, setLoadingMessages, setMessages]
  );

  const openConversation = useCallback(async () => {
    if (!selectedConversation?._id) {
      setConversationId(null);
      setMessages([]);
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/conv/open`,
        { recipientId: selectedConversation._id },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      setConversationId(data.conversationId);

      socket?.emit(
        "chat:open",
        { recipientId: selectedConversation._id },
        (res) => {
          if (!res?.ok) {
            console.warn("chat:open error", res?.error);
          }
        }
      );

      fetchHistory(data.conversationId);
    } catch (error) {
      console.log("open conv error:- ", error);
    }
  }, [
    selectedConversation?._id,
    setConversationId,
    setMessages,
    authUser?.token,
    socket,
    fetchHistory,
  ]);

  useEffect(() => {
    openConversation();
  }, [openConversation]);

  useEffect(() => {
    if (!socket) return;
    const onNew = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message:new", onNew);

    return () => socket.off("message:new", onNew);
  }, [socket, setMessages]);

  const sendMessage = useCallback(
    (content) => {
      if (!conversationId || !content?.trim()) return;
      const trimmed = content.trim();

      const optimistic = {
        _id: `${Date.now()}`,
        conversationId,
        from: authUser?._id || authUser?.username,
        content: trimmed,
        timestamp: new Date().toISOString(),
        optimistic: true,
      };

      setMessages((prev) => [...prev, optimistic]);
      setSending(true);

      socket?.emit(
        "message:send",
        { conversationId, content: trimmed },
        (res) => {
          setSending(false);
          if (!res?.ok) {
            console.error("message:send failed", res?.error);
            setMessages((prev) => prev.filter((m) => m._id !== optimistic._id));
          }
        }
      );
    },
    [conversationId, socket, authUser?._id, authUser?.username, setMessages]
  );

  return {
    conversationId,
    messages,
    loadingMessages,
    sending,
    sendMessage,
    refreshHistory: () => conversationId && fetchHistory(conversationId),
  };
}
