import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ card, savedMovies, onSave, onDelete }) {
  const location = useLocation();
  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${card.image.url}`
                : card.image
            }
            alt={card.nameRU}
            className="movies-card__image"
          />
        </a>
        <div className="movies-card__text">
          <h3 className="movies-card__title">{card.nameRU}</h3>
          <button
            className={`movies-card__button ${
              location.pathname === "/movies"
                ? card.id && savedMovies.some((m) => m.movieId === card.id)
                  ? "movies-card__button_type_saved"
                  : "movies-card__button_type_save"
                : "movies-card__button_type_delete"
            }`}
            onClick={() => {
              if (location.pathname === "/movies") {
                onSave(card);
              }
              if (location.pathname === "/saved-movies") {
                onDelete(card);
              }
            }}
          />
        </div>
        <span className="movies-card__duration">{`${
          Math.trunc(card.duration / 60) > 0
            ? `${Math.trunc(card.duration / 60)}ч`
            : ""
        } ${card.duration % 60}м`}</span>
      </article>
    </li>
  );
}

export default MoviesCard;
