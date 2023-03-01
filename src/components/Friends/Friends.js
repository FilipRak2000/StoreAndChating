import { useState } from 'react'
import style from '../Friends/Friends.module.css'
import FindFriends from './FindFriends/FindFriends'
import Friend from './Friend/Friend'


const Friends = () =>{

    const allpeople = [{id:1, name:'Pawel'},
    {id:2, name:'Gawel'},
    {id:3, name:'Rawel'},
    {id:4, name:'Sawel'},
    {id:5, name:'Lawel'},
    {id:6, name:'Oawel'},
    {id:7, name:'Madziusia'}]

    const [myfriends, setMyFriends] = useState([
        {id:1, name:'Pawel'},
        {id:2, name:'Gawel'},
        {id:3, name:'Rawel'},
        {id:4, name:'Sawel'},
    ])

    const [people, setPeople] = useState([])

    
    const filter = (term) =>{
      let result = allpeople.filter(x => x.name.includes(term) && !myfriends.some(f => f.name === x.name))
        setPeople(result)
      console.log(term)
    }

    const add = (person) => {
        if (myfriends.some(f => f.name === person.name)) {
            return;
        }
        setMyFriends([...myfriends, person]);
        setPeople([])
      }

    return(
        <div className={`${style.friendscontainer} container`}>
            <h1 className="text-center mt-3">Find new friends</h1>
            <FindFriends filter={(term) => filter(term)}/>
            {people.map(person => (
            <>
                <h1 className='mt-2' key={person.id}>{person.name} <button onClick={() => add(person)}>Add</button></h1>
            </>
                
            ))}
            <h1 className="text-center mt-3">My Friends</h1>
            {myfriends.map(friend => (
                <Friend key={friend.id} name={friend.name}/>
            ))}
        </div>
    )
}

export default Friends