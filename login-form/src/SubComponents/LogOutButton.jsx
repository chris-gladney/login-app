import { useNavigate } from "react-router-dom";

function LogOutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", { replace: true });

    return <button onClick={handleLogout}>Logout</button>;
  };
}

export default LogOutButton;
