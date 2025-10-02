import React, { useState } from 'react';
import SearchInput from './searchInput';
import Profile from './profile';
import Conversations from './conversations';
import SearchResultsList from './SearchResultsList';
import { useConversationContext } from '../../context/ConversationContext';


const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { setSelectedConversation } = useConversationContext();

    const handleSelectUser = (user) => {
        setSelectedConversation(user);
        setSearch("");
        setSearchResults([]);
    };

    return (
        <div className="flex flex-col h-full p-3">
            <div className="px-6 py-3 h-21 text-ink font-medium text-2xl border-b-2 border-muted">Chats</div>
            <div className="mt-4">
                <Profile />
            </div>
            <div className="h-12 w-full ">
                <SearchInput 
                    search={search}
                    setSearch={setSearch}
                    setSearchResults={setSearchResults}
                />
            </div>
            <div className='divider px-1'></div>

            <div className="overflow-y-auto  w-full ">
                {search.trim() ? (
                    <SearchResultsList results={searchResults} onSelectUser={handleSelectUser} />
                ) : (
                    <Conversations />
                )}
            </div>
        </div>
    )
}

export default Sidebar;
