import React from "react";

 const SearchInput=()=>{

    return (
        <form className="p-4  ">
            <label className="input bg-gray-400 text-gray-50 shadow-md rounded-xl p-2">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>
        </form>
        
    )
}

export default SearchInput;