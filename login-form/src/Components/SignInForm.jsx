import { useState } from "react";
import { Link } from "react-router-dom";

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
    </form>
  );
}

export default SignInForm;
