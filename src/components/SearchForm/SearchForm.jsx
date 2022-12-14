import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { SEARCH_EMPTY } from "../../utils/constants";

function SearchForm({ handleSearch, durationSwitch, setSubmit }) {
  const localStorageValue = localStorage.getItem("saveSearchValue");

  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(localStorageValue ?? "");
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== "") {
      setChecked(false);
      handleSearch(value);
      setMsg("");
      setSubmit(true);
    } else {
      setMsg(SEARCH_EMPTY);
    }
  };

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setChecked(false);
      handleSearch(value);
      setValue("");
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("saveSearchValue", value);
      localStorage.setItem("saveCheck", checked);
    } else if (location.pathname === "/saved-movies") {
      localStorage.setItem("saveCheck", checked);
    }
  }, [value, checked]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      durationSwitch(checked);
    }
    if (location.pathname === "/movies") {
      handleSearch(localStorageValue ?? "");
      durationSwitch(checked);
    }
  }, [location, checked]);

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          noValidate
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <span className="search__icon"></span>
          <input
            type="text"
            className="search__input"
            placeholder="Фильм"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <span className="search__error">{msg}</span>
          <button type="submit" className="search__button"></button>
        </form>
        <FilterCheckbox
          checked={checked}
          setChecked={setChecked}
          durationSwitch={durationSwitch}
        />
      </div>
    </section>
  );
}

export default SearchForm;
