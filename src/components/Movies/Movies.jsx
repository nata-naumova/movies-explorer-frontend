import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

function Movies({
  isLoading,
  currentUser,
  handleSearch,
  savedMovies,
  movieCards,
  onSave,
  onDelete,
  durationSwitch,
  handleMoreButton,
  count,
}) {
  const [submit, setSubmit] = useState(false);

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          handleSearch={handleSearch}
          durationSwitch={durationSwitch}
          setSubmit={setSubmit}
        />
        <Preloader isLoading={isLoading} />
        <MoviesCardList
          currentUser={currentUser}
          movieCards={movieCards}
          savedMovies={savedMovies}
          onSave={onSave}
          onDelete={onDelete}
          handleMoreButton={handleMoreButton}
          count={count}
          submit={submit}
        />
      </div>
    </main>
  );
}

export default Movies;
