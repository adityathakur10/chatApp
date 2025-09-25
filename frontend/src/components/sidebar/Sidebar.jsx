import React from "react";
import SearchInput  from "./searchInput";
import Profile from "./profile";
 const Sidebar=()=>{
    return(
        <div className="flex flex-col  min-h-full bg-gray-50  p-3">
            <div className="p-3 text-black font-medium text-2xl">Chats</div>
            <div className="h-0.5 mt-1 mb-10 w-full bg-gray-400"></div>
            <Profile/>
            <SearchInput />
            <div className="divider px-3"></div>
        </div>
    )
}

export default Sidebar;