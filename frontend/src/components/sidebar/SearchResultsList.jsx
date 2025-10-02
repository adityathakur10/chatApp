import React from 'react';

const SearchResultsList = ({ results, onSelectUser }) => {
    return (
        <div className="flex flex-col flex-1 py-2 px-4 h-full overflow-y-auto space-y-4">
            {results.length > 0 ? (
                <ul>
                    {results.map((user) => (
                        <li key={user._id} onClick={() => onSelectUser(user)}>
                            <div className="flex items-center rounded-xl p-2 hover:bg-surface cursor-pointer">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.profilePic || 'https://avatar.iran.liara.run/public/boy'} alt="user avatar" />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between px-2">
                                        <p className="font-medium text-lg text-ink">{user.username}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-ink/60 p-4">No users found.</div>
            )}
        </div>
    );
};

export default SearchResultsList;
