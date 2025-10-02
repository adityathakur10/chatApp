import { useContext,createContext,useState } from "react";

export const ConversationContext=createContext();

export const useConversationContext=()=>{
    return useContext(ConversationContext);
}

export const ConversationContextprovider=({children})=>{
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        <ConversationContext.Provider value={{
            selectedConversation,setSelectedConversation,
            messages,setMessages
        }}>
            {children}
        </ConversationContext.Provider>
    )
}