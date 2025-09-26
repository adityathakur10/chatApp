import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/messages';
import DetailsPanel from '../components/details/detailsPanel';

const ChatPage=()=>{
    const {authUser}=useAuthContext()
    return (
        <div className='flex w-full max-h-screen p-4 bg-gray-50'>
            <div className='w-[25%]'><Sidebar/> </div>
            <div className='w-[50%] border-solid border-gray-200 '> <Chat/> </div>
            <div className='w-[25%]'> <DetailsPanel/> </div>
        </div>
    )
};
export default ChatPage;