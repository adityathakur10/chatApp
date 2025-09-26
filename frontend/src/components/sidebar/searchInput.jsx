import React from "react";

 const SearchInput=()=>{

    return (
        <form className="p-4  ">
            <label className=" flex input items-center gap-4 bg-gray-200 h-full w-full text-gray-800  text-lg shadow-md rounded-2xl p-2 focus:outline-none">
                <svg className="h-[1em] opacity-50 text-gray-800 text-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                <input type="search" required placeholder="Search" className="placeholder:text-gray-800 " />
            </label>
        </form>
        
    )
}

export default SearchInput;