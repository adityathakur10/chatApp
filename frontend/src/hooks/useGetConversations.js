import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useBeforeUnload } from "react-router-dom";

const useGetConversations=()=>{
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([])

    useEffect(()=>{
        const getConversations=async ()=>{
            setLoading(true);
            try {
                const res=await axios.get('/api/users')
                const data=res.data;

                setConversations(data);
            } catch (error) {
                toast.error(error.message || 'Something went wrong');;
            }finally{
                setLoading(false);
            }
        }

        getConversations();
    },[]);

    return {loading,conversations};
}

export default useGetConversations;