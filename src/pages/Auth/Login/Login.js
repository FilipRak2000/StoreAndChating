import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingicon from "../../../assets/channels-3.png";
import useAuth from "../../../hooks/useAuth";
import error from "../../../assets/msg_error-0.png";
import style from "../Login/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);

    setTimeout(() => {
      if (false) {
        setAuth(true);
        navigate("/profile");
      } else {
        setValid(false);
        setPassword("");
      }

      setLoading(false);
    }, 500);
  };
  return (
    <div className={`${style.error} container text-center`}>
      <h1 className="text-center mt-2">Login</h1>

      {valid === false ? (
        <div className={`${style.error} container text-center`}>
          <img src={error} />
          <h1>incorrect data </h1>
        </div>
      ) : null}

      <form className="text-center" onSubmit={submit}>
        <div className="form-group mt-2 d-flex justify-content-center">
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mx-2"
          ></input>
        </div>

        <div className="form-group mt-2 d-flex justify-content-center">
          <label>Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-2"
          ></input>
        </div>
        {loading ? <img src={loadingicon} /> : <button className="mt-2">Login</button>}
      </form>
    </div>
  );
};

export default Login;
