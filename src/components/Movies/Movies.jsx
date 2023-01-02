import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect, useLocation } from "react";
import useLookWindowSize from "../../hooks/useLookWindowSize";

import {
  COLUMN_L,
  COLUMN_M,
  COLUMN_S,
  ROW_L,
  ROW_M,
  ROW_S,
  DURATION_MOVIE,
} from "../../utils/constants";

function Movies({ isLoading, currentUser, savedMovies, onSave, onDelete }) {
  const [submit, setSubmit] = useState(false);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const { width } = useLookWindowSize();

  const [checkbox, setCheckbox] = useState(false);
  const moviesApi = JSON.parse(localStorage.getItem("moviesApi"));
  const [filteredMovies, setFilteredMovies] = useState([]);

  /* Отображаем кол-во карточек */
  useEffect(() => {
    if (width >= 1280) {
      setCount(COLUMN_L);
      setNumber(ROW_L);
    } else if (width >= 768 && width <= 1279) {
      setCount(COLUMN_M);
      setNumber(ROW_M);
    } else if (width <= 320 && width <= 468) {
      setCount(COLUMN_S);
      setNumber(ROW_S);
    }
  }, [width]);

  /* Кнопка "Еще" */
  function handleMoreButton() {
    setCount(count + number);
  }

  /* Поиск - Список найденых по слову фильмов */
  function handleSearch(input) {
    const sortedMovieSearch = moviesApi.filter((item) => {
      const values = input.toLowerCase();
      const nameRU = item.nameRU.toLowerCase();
      const nameEN = item.nameEN;
      return (nameEN &&
        nameEN.toLowerCase().includes(values) &&
        values !== "") ||
        (nameRU && nameRU.toLowerCase().includes(values) && input !== "")
        ? item
        : null;
    });
    localStorage.setItem("filtered", JSON.stringify(sortedMovieSearch));
    setFilteredMovies(sortedMovieSearch);
    if (sortedMovieSearch.length === 0) {
      setFilteredMovies([]);
      localStorage.setItem("filtered", JSON.stringify([]));
      //console.log("попробуйте еще раз");
    }
  }

  /* Фильтр поиска по длительности фильмов */
  function durationSwitch(saveCheck) {
    const filterMovies = JSON.parse(localStorage.getItem("filtered"));
    if (saveCheck && filterMovies) {
      const shorts = filterMovies.filter(
        (item) => item.duration <= DURATION_MOVIE
      );
      setFilteredMovies(shorts);
      localStorage.setItem("filtered", JSON.stringify(shorts));
    } else {
      setFilteredMovies(filterMovies);
      localStorage.setItem("filtered", JSON.stringify(filterMovies));
    }
  }

  useEffect(() => {
    setFilteredMovies(JSON.parse(localStorage.getItem("filtered")) || []);
  }, []);

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          handleSearch={handleSearch}
          durationSwitch={durationSwitch}
          setSubmit={setSubmit}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
        <Preloader isLoading={isLoading} />
        <MoviesCardList
          currentUser={currentUser}
          movieCards={filteredMovies}
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
