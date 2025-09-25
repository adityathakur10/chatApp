import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

export const useLogin=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const {setAuthUser}=useAuthContext();
    const navigate=useNavigate();

    const login=async({email,password})=>{
        setLoading(true);
        setError(null);

        try {
            const response=await axios.post('/api/auth/login',{
                email,
                password
            })

            const data=response.data;
            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);
            
            navigate('/');
        } catch (error) {
            setError(error.response.data.error || 'Something went wrong');
            setLoading(false);
        }
    }

    return {login,loading,error}
}