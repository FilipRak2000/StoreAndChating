import axios from "axios";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";

const ProfileDetails = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_PIZZA}`,
        {
          idToken: auth.token,
          password: password,
          returnSecureToken: true,
        }
      );
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      console.log(res);
    } catch (er) {
      console.log(er);
    }

    setLoading(false);
    setSuccess(true);
  };

  return (
    <form className="text-center">
      <div className="form-group mt-2 d-flex justify-content-center">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          className="mx-2"
        ></input>
      </div>

      <div className="form-group mt-2 d-flex justify-content-center">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          className="mx-2"
          placeholder="New Password"
        ></input>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <button className="mt-2" onClick={submit}>
          Save
        </button>
      )}

      {success ? (
        <div>
          <p>success</p>
        </div>
      ) : null}
    </form>
  );
};

export default ProfileDetails;
