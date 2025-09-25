import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/Chat';
import DetailsPanel from '../components/details/detailsPanel';

const ChatPage=()=>{
    const {authUser}=useAuthContext()
    return (
        <div className='grid grid-cols-12 min-h-screen bg-gray-50'>
            <div className='col-span-3'> <Sidebar/> </div>
            <div className='col-span-6 border-solid border-gray-200 '> <Chat/> </div>
            <div className='col-span-3'> <DetailsPanel/> </div>
        </div>
    )
};
export default ChatPage;