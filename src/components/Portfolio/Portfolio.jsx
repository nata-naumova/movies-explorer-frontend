import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="https://nata-naumova.github.io/project-work-1/" target="_blank" rel="noreferrer" className="portfolio__link">Статичный сайт</a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://nata-naumova.github.io/russian-travel/" target="_blank" rel="noreferrer" className="portfolio__link">Адаптивный сайт</a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://nata-naumova.github.io/" target="_blank" rel="noreferrer" className="portfolio__link">Одностраничное приложение</a>
                    </li>
                </ul>
            </div>
        </section>
    );
  }
  
  export default Portfolio;