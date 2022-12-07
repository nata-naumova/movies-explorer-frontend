import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  isLoading,
  movieCards,
  handleSearch,
  onDelete,
  durationSwitch,
}) {
  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          handleSearch={handleSearch}
          durationSwitch={durationSwitch}
        />
        <Preloader isLoading={isLoading} />
        <MoviesCardList movieCards={movieCards} onDelete={onDelete} />
      </div>
    </main>
  );
}

export default SavedMovies;
