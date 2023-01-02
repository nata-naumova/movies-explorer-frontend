import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { SEARCH_EMPTY } from "../../utils/constants";

function SearchForm({
  handleSearch,
  setSubmit,
  checkbox,
  setCheckbox,
  durationSwitch,
}) {
  const location = useLocation();
  const [msg, setMsg] = useState("");
  const [input, setInput] = useState("");

  function handleChangeInput(e) {
    setInput(e.target.value);
  }

  const handleSubmit = (event) => {
    localStorage.getItem("moviesApi") && durationSwitch(checkbox);
    event.preventDefault();
    if (input !== "") {
      setMsg("");
      setSubmit(true);
      if (location.pathname === "/movies") {
        localStorage.setItem("inputMovies", input);
      }
      handleSearch(input);
      durationSwitch(checkbox);
    } else {
      setMsg(SEARCH_EMPTY);
    }
  };

  function handleChangeCheckbox() {
    if (location.pathname === "/movies") {
      setCheckbox(!checkbox);
      localStorage.setItem("checboxMovies", !checkbox);
      handleSearch(input);
      durationSwitch(!checkbox);
    } else if (location.pathname === "/saved-movies") {
      setCheckbox(!checkbox);
      handleSearch(input);
      durationSwitch(!checkbox);
    }
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      setInput(localStorage.getItem("inputMovies") || "");
      setCheckbox(localStorage.getItem("checboxMovies") === "true" || false);
      if (input || checkbox === true) {
        handleSearch(input);
        durationSwitch(checkbox);
      }
    } else if (location.pathname === "/saved-movies") {
      handleSearch(input);
      durationSwitch(checkbox);
    }
  }, [location]);

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" noValidate onSubmit={handleSubmit}>
          <span className="search__icon"></span>
          <input
            type="text"
            className="search__input"
            placeholder="Фильм"
            value={input}
            onChange={handleChangeInput}
            required
          />
          <span className="search__error">{msg}</span>
          <button type="submit" className="search__button"></button>
        </form>
        <FilterCheckbox value={checkbox} onChange={handleChangeCheckbox} />
      </div>
    </section>
  );
}

export default SearchForm;
