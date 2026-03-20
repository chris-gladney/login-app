import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

function SignInForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setMessage("");

        api
          .post("/auth/login", {
            username,
            password,
          })
          .then((res) => {
            setMessage("Login successful");

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setUsername("");
            setPassword("");

            if (res.data.user.role === "admin") {
              navigate("/add-items");
            } else {
              navigate("/purchase-items");
            }
          })
          .catch((err) => {
            setMessage(err.response?.data?.message || "Login failed");
          });
      }}
    >
      <label htmlFor="username">User Name</label>
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
      <button>Login</button>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>

      {message && <p>{message}</p>}
    </form>
  );
}

export default SignInForm;
