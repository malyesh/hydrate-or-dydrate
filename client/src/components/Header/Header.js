import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <div className="logo">
          <h1 className="logo__text">HYDRATE 💦</h1>
          <h1 className="logo__text">OR DYDRATE</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
