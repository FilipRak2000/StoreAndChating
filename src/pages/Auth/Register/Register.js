import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import style from "../Register/Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error/Error";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebase"






const Register = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_PIZZA}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      await setDoc(doc(db, "users", res.data.localId ), {
        email: email,
        uid: res.data.localId
      });
      await setDoc(doc(db, "userChats", res.data.localId), {})
      console.log(res);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      navigate("/myfiles");
    } catch (er) {
      setError(er.response.data.error.message);
    }
  };




  return (
    <div className={`${style.register} container text-center`}>
      <h1>Register</h1>
      <form className="text-center">
        <div>
          <input
            className="mx-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className="mt-2">
          <input
            className="mx-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        {error ? (
          <div className="container mt-2 text-center">
            <Error />
            {error}
          </div>
        ) : null}
        <button className="mt-2" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
