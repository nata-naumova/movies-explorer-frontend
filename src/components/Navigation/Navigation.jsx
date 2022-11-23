import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger';

function Navigation({ isLogged }) {
    /* Перемменные состояния */
    const [menuActive, setMenuActive] = useState(false);

    return(
        <>
            {!isLogged ? (
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/signup" className="register nav__link">Регистрация</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/signin" className="login nav__link">Войти</Link>
                        </li>
                    </ul>
                </nav> 
            ) : (
                <nav className="nav-user">
                    <Hamburger active={menuActive} setActive={setMenuActive} />
                    <ul className={`nav-user__list ${menuActive ? "nav-user__list_opened" : "" }`}>
                        <div className="nav-user__wrapper">
                            <div className="nav__wrapper">
                                <li className="nav__item">
                                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-user__link nav-user__link_active' : 'nav-user__link nav-user__link_hidden')}>Главная</NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/movies" className={({ isActive }) => (isActive ? 'nav-user__link nav-user__link_active' : 'nav-user__link')}>Фильмы</NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/saved-movies" className={({ isActive }) => (isActive ? 'nav-user__link nav-user__link_active' : 'nav-user__link')}>Сохраненные фильмы</NavLink>
                                </li>
                            </div>
                            <li className="nav__item nav__item-user">
                                <NavLink to="/profile" className="nav-user__link-account nav__link-icon">Аккаунт</NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            )}
            
        </>
    );
}

export default Navigation;