import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { db } from "../../firebase";
import { ChatContext } from "../../context/chatContext";
import Chat from "./Chat/Chat";
import style from '../Chats/Chats.module.css'




const Chats = () =>{

    const [chats, setChats] = useState([])
    const [auth] = useAuth()
    const {dispatch} = useContext(ChatContext)
    const [isOpen, setIsOpen] = useState(false)



    useEffect(() =>{

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", auth.userId), (doc) => {
                setChats(doc.data())
            });
            return  () => {
                unsub()
            }
        }
       
        auth.userId && getChats()
    }, [auth.userId])

    const handleSelect = (u) =>{
        dispatch({type:"CHANGE_USER", payload: u})
        setIsOpen(true)
    }


    return(
        <div className={`${style.chats}`}>
            {isOpen && <Chat/> }
            {Object.entries(chats)?.map((chat) => (
                <div className={`${style.userChat}`} key={chat[0]}>
                    <p>{chat[1].userInfo.email}</p>
                    <div>
                    <button  onClick={() => handleSelect(chat[1].userInfo)}>chat</button>
                    <button>files</button>
                    </div>
                </div>
                
            ))}
        </div>
    )
}

export default Chats