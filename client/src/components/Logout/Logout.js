import "./Logout.scss";
import { useNavigate } from "react-router-dom";

let Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
