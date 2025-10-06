import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../context/AuthContext";

export default function useSocket() {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authUser?.token) {
      setSocket(null);
      return;
    }
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
      auth: { token: authUser.token },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, [authUser?.token]);

  return socket;
}
