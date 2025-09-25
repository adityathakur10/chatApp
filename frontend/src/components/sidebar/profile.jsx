import React from "react";

const Profile=()=>{
    return (
            <div className="flex flex-col gap-4 items-center justify-center">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">D</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-black">Aditya Thakur</h2>
                    <span className="text-sm text-base-content/70">online</span>
                </div>
            </div>
    )
}

export default Profile;