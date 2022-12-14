import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../Movies/More/More";
import { SEARCH_NOTFOUND } from "../../utils/constants";

function MoviesCardList({
  currentUser,
  movieCards,
  savedMovies,
  onSave,
  onDelete,
  handleMoreButton,
  count,
  submit,
}) {
  return (
    <section className="movies-list">
      <ul className="movies__list">
        {movieCards
          .map((card, id) => {
            return (
              <MoviesCard
                key={card.id ? card.id : id}
                card={card}
                isLiked={card.isLiked}
                savedMovies={savedMovies}
                currentUser={currentUser}
                onSave={onSave}
                onDelete={onDelete}
              />
            );
          })
          .slice(0, count)}
      </ul>

      {submit && movieCards.length === 0 ? (
        <p>{SEARCH_NOTFOUND}</p>
      ) : (
        movieCards.length > count && (
          <More handleMoreButton={handleMoreButton} />
        )
      )}
    </section>
  );
}

export default MoviesCardList;
