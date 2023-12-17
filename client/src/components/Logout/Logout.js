import "./Logout.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) setIsLoggedIn(false);
  // }, []);
  return (
    <>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
