import { useState, useEffect, useRef } from "react"


const FindFriends = (props) =>{

    const [term, setTerm] = useState('')
    const inputRef = useRef()

    const search = (e) =>{
        e.preventDefault()
        console.log(term)
        if(term === ''){
            setTerm('')
        }else{
            props.filter(term)
        }
        setTerm('')
    }

    const focusInput = () =>{
        inputRef.current.focus()
    }

    useEffect(() =>{
        focusInput()
    }, [])

    const updateTerm = (e) =>{
        setTerm(e.target.value)
    }

    return(
        <div className="text-center">
        <form>
          <input ref={inputRef} onChange={updateTerm} value={term} type="text" placeholder="search by email" />
          <button onClick={search} >Search</button>
        </form>
      </div>
    )
}

export default FindFriends