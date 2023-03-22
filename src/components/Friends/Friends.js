import { useEffect, useState } from 'react'
import style from '../Friends/Friends.module.css'
import FindFriends from './FindFriends/FindFriends'
import { collection, query, where, getDocs, getDoc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { doc } from 'firebase/firestore';
import Chats from '../Chats/Chats';
import { onSnapshot } from 'firebase/firestore';





const Friends = () =>{

const [peoplefb, setPeoplefb] = useState([])
const [friends, setfriends] = useState([])
const [auth] = useAuth()
let allpeople = []

const fetchUsers = async () =>{
try{
    const q = query(collection(db, "users"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allpeople.push({id: doc.id, ...doc.data()})
      console.log(doc.id, " => ", doc.data());
    });
    setPeoplefb(allpeople)
}catch(err){
    console.log(err)
}
}
console.log(peoplefb)

useEffect(() =>{
    fetchUsers()
}, [])


useEffect(() =>{

    const getfriends = () => {
        const unsub = onSnapshot(doc(db, "userChats", auth.userId), (doc) => {
            setfriends(doc.data())
            console.log()
        });
        return  () => {
            unsub()
        }
    }

    getfriends()

}, [])


    const [people, setPeople] = useState([])

    
    const filter = (term) =>{
        let friendsEmails = Object.entries(friends)?.map((friend) => (friend[1].userInfo.email))
      let result = peoplefb.filter(x => x.email.includes(term) && !(auth.email === x.email) && !friendsEmails.includes(x.email))
        setPeople(result)

        console.log(friendsEmails);
      console.log(term)
      console.log(auth.email)
    }

    const friendsRef = doc(db, "users", auth.userId)

    const add = async (person) => {
        

        const combinedId = auth.userId > person.id ? auth.userId + person.id : person.id + auth.userId
        try{
            const res = await getDoc(doc(db, "chats", combinedId))
            if(!res.exists()){
                await setDoc(doc(db, "chats", combinedId), {messages: []})

                await updateDoc(doc(db, "userChats", auth.userId), {
                    [combinedId + ".userInfo"]: {
                        uid: person.id,
                        email: person.email
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", person.id), {
                    [combinedId + ".userInfo"]: {
                        uid: auth.userId,
                        email: auth.email
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                setPeople(prevPeople => prevPeople.filter(p => p.id !== person.id));
            }
        }catch(err){
            console.log(err)
        }
        

      }


    return(
        <div className={`${style.friendscontainer} container`}>
            <h1 className="text-center mt-3">Find new friends</h1>
            <FindFriends filter={(term) => filter(term)}/>
            {people.map(person => (
            <>
                <h3 className='mt-2' key={person.id}>{person.email} <button onClick={() => add(person)}>Add</button></h3>
            </>
                
            ))}
            <h1 className="text-center mt-3">My Friends</h1>
            <Chats/>
        </div>

    )
}

export default Friends