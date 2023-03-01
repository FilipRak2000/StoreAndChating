import { useContext } from "react";
import AuthContext from "../context/authContext";


const useAuth = () =>{
    const authContext = useContext(AuthContext);
    const auth = authContext.isAuth
    const setAuth = (value) => {
        if(value){
            authContext.login()
        }
        else{
            authContext.logout()
        }
    }
    return [auth, setAuth]
}

export default useAuth