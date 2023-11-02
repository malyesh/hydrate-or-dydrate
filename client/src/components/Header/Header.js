import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <div className="logo">
          <div className="logo-top">
            <h1 className="logo-top__text">HYDRATE&nbsp;</h1>
            <span className="logo-top__emoji">💦</span>
          </div>
          <h1 className="logo__text">OR DYDRATE</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
