import { useContext,createContext,useState } from "react";

export const ConversationContext=createContext();

export const useConversationContext=()=>{
    return useContext(ConversationContext);
}

export const ConversationContextprovider=({children})=>{
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [conversationId,setConversationId]=useState(null);
    const [loadingMessages,setLoadingMessages]=useState(false);
    const [conversations, setConversations] = useState([]);


    return (
        <ConversationContext.Provider value={{
            selectedConversation,setSelectedConversation,
            messages,setMessages,
            conversationId,setConversationId,
            loadingMessages,setLoadingMessages,
            conversations,setConversations
        }}>
            {children}
        </ConversationContext.Provider>
    )
}