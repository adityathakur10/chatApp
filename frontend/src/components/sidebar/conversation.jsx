import React from "react";

const formatTime=(dateString)=>{
    const date=new Date(dateString);

    let hours=date.getHours();
    const minutes=date.getMinutes();

    const ampm=hours>=12? 'PM':'AM';
    hours=hours%12;
    hours=hours?hours:12;

    return `${hours}:${minutes<10?'0'+minutes: minutes} ${ampm}`;
}

const Conversation=({conversation})=>{
    const lastmessage=conversation.lastmessage;
    return (
        <>
            <div className="flex  items-center rounded-xl p-2 hover:bg-gray-200">
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        {/* //Todo :add dynamic profil image */}
                        <img src={conversation.profilePic} alt="" />
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="flex justify-between px-2">
                        <p className="font-medium text-lg text-black">{conversation.username}</p>
                        <span className="text-md text-black">{formatTime(lastmessage.timestamp)}</span>
                    </div>
                    <div className="text-sm text-gray-500 px-2">
                        <p>{lastmessage.content}</p>
                    </div>
                </div>
            </div>
            

            
        </>
    )
}

export default Conversation;