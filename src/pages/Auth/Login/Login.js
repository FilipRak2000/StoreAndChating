import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import style from "../Login/Login.module.css";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const [error, setError] = useState('')


  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_PIZZA}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );
      console.log(res)
      setAuth({
        email:res.data.email,
        token:res.data.idToken,
        userId:res.data.localId
      })
      navigate("/profile");
    } catch (er) {
      console.log(er);
      setError(er.response.data.error.message)
    }
    setLoading(false)
  };


  return (
    <div className={`${style.loginlayout} container text-center`}>
      <h1>Login</h1>

      {valid === false ? (
        <div className={`${style.loginlayout} container text-center`}>
          <Error />
          <h1>incorrect data </h1>
        </div>
      ) : null}

      <form className="text-center" onSubmit={submit}>
        <div className="form-group mt-2 d-flex justify-content-center">
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mx-2"
            placeholder="Login"
          ></input>
        </div>

        <div className="form-group mt-2 d-flex justify-content-center">
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-2"
            placeholder="Password"
          ></input>
        </div>
        {error ? (
                    <div className="container mt-2 text-center">
                    <Error/>
                    {error}
                    </div>
                    
                ) : null}
        {loading ? <Loading /> : <button className="mt-2">Login</button>}
      </form>
    </div>
  );
};

export default Login;
