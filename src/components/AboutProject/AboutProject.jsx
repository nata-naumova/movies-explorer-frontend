import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h3 className="about__title">О проекте</h3>
        <span className="about__line"></span>
        <ul className="about__list">
          <li className="about__item">
            <h4 className="about-title">Дипломный проект включал 5 этапов</h4>
            <p className="about__subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about__item">
            <h4 className="about-title">На выполнение диплома ушло 5 недель</h4>
            <p className="about__subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-progress">
          <div className="about-progress__container about-progress__backend">
            <span className="about-progress__duration about-progress__duration_backend">
              1 неделя
            </span>
            <span className="about-progress__title">Back-end</span>
          </div>
          <div className="about-progress__container about-progress__frontend">
            <span className="about-progress__duration about-progress__duration_frontend">
              4 недели
            </span>
            <span className="about-progress__title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
