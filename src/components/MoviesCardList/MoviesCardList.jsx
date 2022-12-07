import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../Movies/More/More";

function MoviesCardList({
  currentUser,
  movieCards,
  savedMovies,
  onSave,
  onDelete,
  handleMoreButton,
  count,
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

      {movieCards.length === 0 ? (
        <p>Введите название фильма в поисковой строке</p>
      ) : (
        movieCards.length > count && (
          <More handleMoreButton={handleMoreButton} />
        )
      )}
    </section>
  );
}

export default MoviesCardList;
