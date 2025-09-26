import React from "react";

const Conversation=()=>{
    return (
        <>
            <div className="flex  items-center rounded-xl hover:bg-gray-200">
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt="" />
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="flex justify-between px-2">
                        <p className="font-medium text-lg text-black">Aditya Thakur</p>
                        <span className="text-md text-black">11:23</span>
                    </div>
                    <div className="text-sm text-gray-500 px-2">
                        <p>hey how are you !</p>
                    </div>
                </div>
            </div>
            
            {/* <div className='divider my-0 py-0 h-3 divider-primary ' /> */}

            
        </>
    )
}

export default Conversation;