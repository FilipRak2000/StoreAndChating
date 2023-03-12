import { useContext } from "react";
import AuthContext from "../context/authContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const auth = authContext.user
  const setAuth = (user) => {
    if (user) {
      authContext.login(user);
        window.localStorage.setItem("token-data", JSON.stringify(user));
      }else{

        authContext.logout();
      window.localStorage.removeItem("token-data", JSON.stringify(user))
      }
    
  };
  return [auth, setAuth];
};

export default useAuth;
