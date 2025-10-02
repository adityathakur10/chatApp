import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext";

const useSearchUser=()=>{
    const [loading,setLoading]=useState(false);
    const {authUser}=useAuthContext();  

    const searchUser=async(query)=>{
        setLoading(true);

        try {
            const res=await axios.get(`/api/users/search/${query}`,{
                headers:{Authorization:`Bearer ${authUser.token}`}
            })
            const data=res.data;
            return data;

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || `an error occurred`);
            return [];
        }finally{
            setLoading(false);
        }   
    }

    return {loading,searchUser}
}

export default useSearchUser;
