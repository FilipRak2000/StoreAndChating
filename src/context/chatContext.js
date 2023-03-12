import { createContext, useContext, useReducer } from "react";
import useAuth from "../hooks/useAuth";



export const ChatContext = createContext()
export const ChatContextProvider = ({children}) => {
    const [auth] = useAuth({})

    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }

    const chatReducer = (state, action) =>{
        switch(action.type){
            case 'CHANGE_USER':
                return{
                    user:action.payload,
                    chatId: auth.userId > action.payload.uid ? auth.userId + action.payload.uid : action.payload.uid + auth.userId

                }
            default: return state;
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)


    return(
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
  
}
