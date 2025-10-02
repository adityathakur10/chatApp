import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
    const { authUser, logout } = useAuthContext();
    const username = authUser?.username || "User";
    const profileSrc = authUser?.profilePicture && authUser.profilePicture.trim()
        ? authUser.profilePicture
        : `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(username)}`;

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={profileSrc} alt={username} />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-lg font-bold text-ink">{username}</h2>
                <button
                    type="button"
                    onClick={logout}
                    className="flex justify-center items-center shadow-lg w-full p-4  btn btn-sm bg-brand border border-none rounded-lg text-lg text-ink "
                    aria-label="Log out"
                    title="Log out"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
