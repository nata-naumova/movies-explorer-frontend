import "./Movies.css";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

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
  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          handleSearch={handleSearch}
          durationSwitch={durationSwitch}
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
        />
      </div>
    </main>
  );
}

export default Movies;
