import React from "react";
import SearchInput from "./searchInput";
import Profile from "./profile";
import Conversations from "./conversations";
const Sidebar = () => {
    return (
        <div className="flex flex-col h-full p-3">
            <div className="px-6 py-3 h-21 text-black font-medium text-2xl border-b-2 border-gray-400 ">Chats</div>
            {/* <div className="h-0.5 mt-1 mb-10 w-full bg-gray-400"></div> */}
            <div className="mt-4">
                <Profile />
            </div>
            <div className="h-12 w-full ">
                <SearchInput />
            </div>
            <div className='divider px-1'></div>
            <div className="overflow-y-auto  w-full ">
                <Conversations />
            </div>
        </div>
    )
}

export default Sidebar;