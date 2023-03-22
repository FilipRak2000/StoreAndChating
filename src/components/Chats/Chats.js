import { useContext, useEffect, useState } from "react";
import {
  deleteField,
  doc,
  FieldValue,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { db } from "../../firebase";
import { ChatContext } from "../../context/chatContext";
import Chat from "./Chat/Chat";
import style from "../Chats/Chats.module.css";
import { useNavigate } from "react-router-dom";
import { deleteDoc } from "firebase/firestore";
import Pagination from "../Pagination/Pagination";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [friendsPerPage, setFriendsPerPage] = useState(5);
  const [auth] = useAuth();
  const { dispatch } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", auth.userId), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    auth.userId && getChats();
  }, [auth.userId]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setIsOpen(true);
  };

  const checkFiles = (uid, email) => {
    console.log(uid);
    navigate(`/friendfiles/${uid}/${email}`);
  };

 
  

  const lastFriendIndex = currentPage * friendsPerPage;
  const firstFriendInex = lastFriendIndex - friendsPerPage;
  const currentFriends = Object.entries(chats)?.slice(
    firstFriendInex,
    lastFriendIndex
  );

  return (
    <div className={`${style.chats}`}>
      {isOpen && <Chat />}
      {currentFriends?.map((chat) => (
        <div className={`${style.userChat}`} key={chat[0]}>
          <p>{chat[1].userInfo.email}</p>
          <div>
            <button
              className={`${style.chat}`}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              chat
            </button>
            <button
              className={`${style.files}`}
              onClick={() =>
                checkFiles(chat[1].userInfo.uid, chat[1].userInfo.email)
              }
            >
              files
            </button>
          </div>
        </div>
      ))}
      
      <Pagination
        totalItems={Object.entries(chats).length}
        itemsPerPage={friendsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Chats;
