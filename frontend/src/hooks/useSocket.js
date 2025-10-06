import { useAuthContext } from "../context/AuthContext";
import { useMemo, useEffect } from "react";
import {io} from "socket.io-client"

export default function useSocket(){
    const {authUser} =useAuthContext();

    const socket=useMemo(()=>{
        if(!authUser?.token)return null;

        return io("http://localhost:3000",{
            transports:["websocket"],
            auth:{token:authUser.token}
        })
    },[authUser?.token]);

    useEffect(()=>{
       return ()=> socket?.close()
    },[socket])

    return socket
}