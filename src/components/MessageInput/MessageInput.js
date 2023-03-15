import { Timestamp, updateDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { ChatContext } from "../../context/chatContext"
import useAuth from "../../hooks/useAuth"
import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import {v4 as uuid} from "uuid"
import { arrayUnion } from "firebase/firestore"

const MessageInput = () =>{
    const [text, setText] = useState('')
    const [auth] = useAuth()
    const {data} = useContext(ChatContext)

    const SendMessage =  async () =>{
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId:auth.userId,
                date:Timestamp.now()
            })
        })
        setText("")
    }

    return(
        <div className="input mt-2">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    {text && <button onClick={SendMessage}>send</button>}
      </div>
    )
}

export default MessageInput