import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export default function useConversations() {
  const { authUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    if (!authUser?.token) return;
    setLoading(true);
    try {
      const { data } = await axios.get("/api/conv", {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      setConversations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("fetch conversations error", error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, [authUser?.token]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    refresh: fetchConversations,
  };
}
