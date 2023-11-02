import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="logo-link__text">Hydrate or Dydrate</h1>
      </Link>
    </header>
  );
};

export default Header;
