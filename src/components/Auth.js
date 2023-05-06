import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [message, setMessage] = useState('')

  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    // const URL = "https://socialmtn.devmountain.com";

    axios
      .post(register ? `http://localhost:4005/register` : `http://localhost:4005/login`, body)
      .then(({res}) => {
        console.log(res);
        setRegister(res)
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data)
        setPassword('');
        setUsername('');
      });
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn">
            {register ? "Sign Up" : "Login"}
        </button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
