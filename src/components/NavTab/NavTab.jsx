import './NavTab.css';
import { Link } from "react-scroll";

function NavTab() {
    return (
        <>
            <ul className="navtab">
                <li>
                    <Link to="about" spy={true} smooth={true} offset={-100} duration={500} className="navtab__link">О проекте</Link>
                </li>
                <li>
                    <Link to="techs" spy={true} smooth={true} offset={-100} className="navtab__link">Технологии</Link>
                </li>
                <li>
                    <Link to="about-me" spy={true} smooth={true} offset={-100} className="navtab__link">Студентка</Link>
                </li>
            </ul>
        </>
    );
  }
  
  export default NavTab;