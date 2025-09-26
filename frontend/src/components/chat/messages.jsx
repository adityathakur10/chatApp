import React from "react";
import Msg from "./msg";
import { Send } from 'lucide-react';

 const Chat=()=>{
    return (
        <div className="relative p-3 h-full bg-gray-200 rounded-3xl shadow-md text-black  overflow-hidden">
            <div className="z-10 absolute left-0 top-0 bg-gray-200/80 text-black font-medium text-2xl h-24 p-6 backdrop-blur-sm  w-full border-b-2 border-gray-400 ">
                Group chat
            </div>
            <div className="mt-2 h-[85%] mb-10 px-4 overflow-auto scrollbar-hidden">
                <Msg/>
                <Msg/>
                <Msg/>
                <Msg/>
                <Msg/>
                <Msg/>
                <Msg/>
                <Msg/>
            </div>
            <div className="flex w-full h-20 mb-10  gap-x-4 items-center">
                <input type=" text"  className="relative w-full h-14 pl-4  pr-18 rounded-xl bg-white shadow focus:outline-none "/>
                <div className="absolute p-2 flex items-center justify-center rounded-lg right-6 bg-gray-200">
                    <Send className="" />
                </div>
            </div>


        </div>
    )
}

export default Chat;
