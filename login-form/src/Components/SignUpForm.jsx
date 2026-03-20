import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
    </form>
  );
}

export default SignUpForm;
