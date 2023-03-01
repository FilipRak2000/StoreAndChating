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
        <div className="d-flex text-center">
        <form>
          <input ref={inputRef} onChange={updateTerm} value={term} type="text" placeholder="search" />
          <button onClick={search} >Search</button>
        </form>
      </div>
    )
}

export default FindFriends