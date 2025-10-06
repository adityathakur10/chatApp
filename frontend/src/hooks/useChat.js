import { useEffect,useState,useCallback } from "react";
import axios from "axios"

import useSocket from "./useSocket";
import { useAuthContext } from "../context/AuthContext";
import { useConversationContext } from "../context/ConversationContext";


export default function useChat(){
    const {selectedConversation,setSelectedConversation,
            messages,setMessages,
            conversationId,setConversationId,
            loadingMessages,setLoadingMessages
        }=useConversationContext();

    const socket=useSocket();
    const {authUser}=useAuthContext();

    const fetchHistory=useCallback(
        async(convId)=>{
            setLoadingMessages(true);

            try {
                const {data}=await axios.get(`/conv/${convId}/messages`,{
                    headers:{
                        Authorization:`Bearer ${authUser.token}`
                    }
                })
                setMessages(Array.isArray(data)?data:[]);    
            } catch (error) {
                console.log("fetching history error",error);
                setMessages([]);
            }finally{
                setLoadingMessages(false);
            }
        },[setLoadingMessages,setMessages,authUser?.token])


    const openConversation=useCallback(
        async()=>{
            if(!selectedConversation?._id){
                setConversationId(null);
                setMessages([]);
                return;
            }

            try {
                const {data}=await axios.post(`/conv/open`,{
                    recipientId:selectedConversation._id
                },{
                    headers:{
                        Authorization:`Bearer ${authUser.token}`
                    }
                })
                setConversationId(data.conversationId);

                socket?.emit("chat:open",{recipientId:selectedConversation._id},(res)=>{
                    if(!res?.ok){
                        console.warn("chat:open error",res?.error)
                    }
                })

                fetchHistory(data.conversationId);

            } catch (error) {
                console.log("open conv error:- ",error);
            }
        },
        [selectedConversation?._id,setMessages,setConversationId,authUser?.token,socket,fetchHistory])

    useEffect(()=>{
        openConversation();
    },[openConversation])
        
    useEffect(()=>{
        if(!socket)return ;
        const onNew=(msg)=>{
            setMessages((prev)=>[...prev,msg])
        }

        socket.on('message:new',onNew);

        return ()=>socket.off("messsage:new",onNew)
    },[setMessages,socket])


    const senMessage=useCallback(
        (content)=>{
            if(!conversationId || !content.trim())
                return ;
            const trimmed=content.trim();
            
        }
    )
}