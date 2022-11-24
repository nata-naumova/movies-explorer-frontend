import './Header.css';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import logo from '../../images/logo.svg';

function Header({ isLogged = true }) {
    return(
        <header className={`header ${isLogged ? 'header__logged' : ''}`}>
            <div className="header__container">
                <Link to='/' className="header__link">
                    <img src={logo} alt="Логотип сайта" />
                </Link>
                <Navigation isLogged={isLogged} />
            </div>
        </header>
    );
}

export default Header;