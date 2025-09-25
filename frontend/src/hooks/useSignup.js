import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const {setAuthUser} =useAuthContext();
    const navigate=useNavigate()

    const signup=async({name,email,password})=>{
        setLoading(true);
        setError(null);
        
        try {
            const response=await axios.post('/api/auth/signup',{
            username:name,email,password
            })
            const data=response.data

            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);

            navigate('/')
        } catch (error) {
            setError(error.response.data.error||'Something went wrong');
            setLoading(false);
        }
    }
    return {signup,loading,error};
} 