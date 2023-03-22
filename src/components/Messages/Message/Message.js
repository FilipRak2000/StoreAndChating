import { useContext } from "react"
import { ChatContext } from "../../../context/chatContext"
import useAuth from "../../../hooks/useAuth"

const Message = ({message}) =>{

    const [auth] = useAuth()
    const {data} = useContext(ChatContext)
    console.log(message.text)
    return(
        <div className="message_owner">
            <div className="message_info">

                {message.text && <p className="text-dark">{message.senderId === auth.userId ? auth.email : data.user.email}</p> }
            </div>
            <div className="message_content">
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default Message