import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";

import { DURATION_MOVIE } from "../../utils/constants";

function SavedMovies({ isLoading, onDelete, savedMovies }) {
  const [submit, setSubmit] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [showMovies, setShowMovies] = useState(savedMovies);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  useEffect(() => {
    setShowMovies(savedMovies);
  }, [savedMovies]);

  /* Поиск - Список сохраненных фильмов  */
  function handleSavedMoviesSearch(value) {
    const sortedMovieSearch = savedMovies.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN;
      const nameRU = card.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(values)) ||
        (nameRU && nameRU.toLowerCase().includes(values))
        ? card
        : null;
    });
    setShowMovies(sortedMovieSearch.length !== 0 ? sortedMovieSearch : []);
  }
  /* Фильтр поиска по длительности сохраненных фильмов */
  function savedDurationSwitch(saveCheck) {
    if (saveCheck) {
      const shorts = showMovies.filter(
        (item) => item.duration <= DURATION_MOVIE
      );
      setShowMovies(shorts);
    } else {
      setFilteredSavedMovies(showMovies);
    }
  }

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          handleSearch={handleSavedMoviesSearch}
          durationSwitch={savedDurationSwitch}
          setSubmit={setSubmit}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
        <Preloader isLoading={isLoading} />
        <MoviesCardList
          movieCards={showMovies}
          savedMovies={savedMovies}
          onDelete={onDelete}
          submit={submit}
        />
      </div>
    </main>
  );
}

export default SavedMovies;
