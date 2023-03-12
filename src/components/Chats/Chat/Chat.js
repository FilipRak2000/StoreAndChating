import { useContext } from "react"
import { ChatContext } from "../../../context/chatContext"
import MessageInput from "../../MessageInput/MessageInput"
import style from '../Chat/Chat.module.css'
import Messages from "../../Messages/Messages"


const Chat = () =>{
    const {data} = useContext(ChatContext)
    return(
        <div className={`${style.chatwindow} container mt-2`}>
            <div className="container text-center">
            <p className="text-dark">Chat with {data.user?.email}</p>
            </div>
            <div className={style.messageContainer}>
                <Messages/>
            </div>
            <MessageInput/>
        </div>
    )
}

export default Chat