import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

function SignUpForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setMessage("")

        if (password !== confirmPwd) {
          setMessage("Passwords do not match")
          return 
        }

        api
          .post("/auth/register", {
            username,
            password,
            role: "user",
          })
          .then((res) => {
            setMessage("User registered successfully");

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setUsername("");
            setPassword("");
            setConfirmPwd("");

            navigate("/"); // go to login
          })
          .catch((err) => {
            setMessage(
              err.response?.data?.message || "Registration failed"
            );
          });
      }}
    >
      <label htmlFor="username">New Username</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
        onChange={(e) => setConfirmPwd(e.target.value)}
      />
      <br />
      <button>Login</button>
      <Link to="/">
        <button>Sign In</button>
      </Link>
      <Link to="/admin-reg">
        <button>Admin Sign Up</button>
      </Link>

      {message && <p>{message}</p>}
    </form>
  );
}

export default SignUpForm;
