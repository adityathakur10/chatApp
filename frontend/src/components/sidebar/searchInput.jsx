import React, { useEffect, useRef } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import useDebounce from "../../hooks/useDebounce";

const SearchInput = ({ search, setSearch, setSearchResults }) => {
    const { loading, searchUser } = useSearchUser();
    const debouncedSearch = useDebounce(search, 350);
    const requestIdRef = useRef(0);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const q = debouncedSearch.trim();
        if (!q) {
            setSearchResults([]);
            return;
        }

        const currentId = ++requestIdRef.current;
        (async () => {
            const users = await searchUser(q);
            if (currentId === requestIdRef.current) {
                setSearchResults(Array.isArray(users) ? users : []);
            }
        })();
    }, [debouncedSearch]);

    return (

            <form onSubmit={handleSubmit} className="p-4 relative">
                <label className='flex input items-center gap-4 bg-surface-2 h-full w-full text-ink text-lg shadow-md rounded-2xl p-2 border border-muted focus-within:ring-2 focus-within:ring-brand'>
                    <svg className="h-[1em] opacity-60 text-ink text-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input
                        type="search"
                        placeholder="Search for a user..."
                        className="placeholder:text-ink/70 bg-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
            </form>

           
    );
};

export default SearchInput;
