import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";

const Header = () => {
  const location = useLocation();

  const isUserAuthPage =
    location.pathname === "/login" || location.pathname === "/";

  return (
    <header className="header">
      <div className="header__container">
        {!isUserAuthPage && (
          <Link to="/home" className="logo-link">
            <div className="logo">
              <h1 className="logo__text">HYDRATE 💦</h1>
              <h1 className="logo__text">OR DYDRATE</h1>
            </div>
          </Link>
        )}
        {isUserAuthPage && (
          <Link to="/" className="logo-link">
            <div className="logo">
              <h1 className="logo__text">HYDRATE 💦</h1>
              <h1 className="logo__text">OR DYDRATE</h1>
            </div>
          </Link>
        )}
        {!isUserAuthPage && <Logout />}
      </div>
    </header>
  );
};

export default Header;
