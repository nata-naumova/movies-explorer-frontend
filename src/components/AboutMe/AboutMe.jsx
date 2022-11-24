import './AboutMe.css';
import aboutMe from '../../images/about-me.jpg';

function AboutMe() {
    return (
        <section id="about-me" className="about-me">
            <div className="about-me__container">
                <h3 className="about-me__title-main">Студентка</h3>
                <span className="about-me__line"></span>
                <div className="about-me__wrapper">
                    <div className="about-me__content">
                        <h2 className="about-me__title">Ната</h2>
                        <h4 className="about-me__subtitle">Фронтенд-разработчик, 23 года</h4>
                        <p className="about-me__text">
                        Я родилась и живу в Казани, заканчиваю КНИТУ-КАИ на специальность "Техник по информационным системам". У меня есть кот Барсик. Я люблю слушать музыку, а ещё увлекаюсь играми. Недавно начала кодить. После прохождения курса по веб-разработке, начала заниматься фриланс-заказами.
                        </p>
                        <a href="https://github.com/nata-naumova" target="_blank" rel="noreferrer" className="about-me__link" >Github</a>
                    </div>
                    <div className="about-me__photo">
                        <img src={aboutMe} alt="Картинка с пинтереста" className="about-me__img" />
                    </div>
                </div>
                
                
            </div>
        </section>
    );
  }
  
  export default AboutMe;