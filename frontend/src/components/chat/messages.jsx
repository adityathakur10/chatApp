import React from "react";
import Msg from "./msg";
import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";
import { Send } from 'lucide-react';
import { assets } from "../../assets/assets";

 const Chat=()=>{
    const { authUser } = useAuthContext();
    const { selectedConversation, messages } = useConversationContext();

    const otherUser = selectedConversation || { username: "Sandra Perry", profilePic: "https://avatar.iran.liara.run/public/girl" };
    const me = authUser?.username || "You";

    const demoMessages = [
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm1', from: otherUser.username, content: 'Hello! 👋', timestamp: new Date().toISOString() },
        { _id: 'm2', from: me, content: 'Hey there! Nice to meet you.', timestamp: new Date().toISOString() },
        { _id: 'm3', from: otherUser.username, content: 'How can I help you today?', timestamp: new Date().toISOString() },
        { _id: 'm4', from: me, content: 'Just testing the new chat UI!', timestamp: new Date().toISOString() },
    ];

    const items = Array.isArray(messages) && messages.length ? messages : demoMessages;

    return (
        <div className="relative p-3 h-full bg-gray-100 rounded-3xl shadow-md text-ink flex flex-col" 
                    style={{
                 backgroundImage: assets.bg
          ? `linear-gradient(rgba(170,170,170,0.9), rgba(170,170,170,0.9)), url(${assets.bg})`
          : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxSizing: "border-box",

            }}>
            <div className="absolute font-medium text-2xl px-6 py-6   w-full  flex-none left-0 top-0 z-10 bg-surface-2/45 overflow-hidden rounded-xl backdrop-blur-md ">
                Group chat
            </div>
            <div className="flex flex-col gap-4 overflow-auto px-4 py-2 scrollbar-hidden">
                {items.map((m) => (
                    <Msg key={m._id || m.timestamp} message={m} otherUser={otherUser} />
                ))}
            </div>
            <div className="relative flex items-center gap-x-4 p-4 flex-none">
                <input type="text" className="flex-1 h-14 pl-4 pr-4 rounded-xl bg-surface-2 border border-muted shadow focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"/>
                <button type="button" className="absolute right-7 p-2 rounded-lg bg-brand text-white shadow">
                    <Send className="text-ink h-5 w-6" />
                </button>
            </div>
        </div>
    )
}

export default Chat;
