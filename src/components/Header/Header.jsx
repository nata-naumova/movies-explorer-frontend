import "./Header.css";

import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import logo from "../../images/logo.svg";

function Header({ loggedIn }) {
  const location = useLocation();

  return location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile" ? (
    <header className={`header ${loggedIn ? "header__logged" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип сайта" />
        </Link>
        <Navigation isLogged={loggedIn} />
      </div>
    </header>
  ) : (
    <></>
  );
}

export default Header;
