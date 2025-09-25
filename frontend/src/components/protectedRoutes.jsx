import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const protectedRoutes=({children})=>{
    const {authUser}=useAuthContext();
    
    if(!authUser){
        return <Navigate to="/login"/>
    }
    return children;
}