import { createContext,useContext,useEffect,useState } from "react";

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user"))||null);
    
    // Decode JWT payload without verifying signature (client-side check only)
    const decodeJwt = (token) => {
        try {
            const payload = token.split('.')[1];
            // base64url -> base64
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
            const json = atob(padded);
            return JSON.parse(json);
        } catch {
            return null;
        }
    };

    // On mount and whenever token changes, log out if expired
    useEffect(() => {
        const token = authUser?.token;
        if (!token) return;
        const payload = decodeJwt(token);
        const expMs = payload?.exp ? payload.exp * 1000 : 0;
        if (!payload || (expMs && Date.now() >= expMs)) {
            try { localStorage.removeItem('chat-user'); } catch {}
            setAuthUser(null);
        }
    }, [authUser?.token]);

    // Manual logout helper for UI actions
    const logout = () => {
        try { localStorage.removeItem('chat-user'); } catch {}
        setAuthUser(null);
    };

    return(
        <AuthContext.Provider value={{authUser,setAuthUser,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
