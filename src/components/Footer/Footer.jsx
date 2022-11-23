import './Footer.css';

function Footer() {
    return (
        <footer className="section footer">
            <div className="footer__container">
                <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className="footer__content">
                    <p className="footer__copyright">&copy;&nbsp;{new Date().getFullYear()}</p>
                    <ul className="footer__list">
                        <li className="footer__item">
                            <a href="/" className="footer__link">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__item">
                            <a href="/" className="footer__link">Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
  
  export default Footer;