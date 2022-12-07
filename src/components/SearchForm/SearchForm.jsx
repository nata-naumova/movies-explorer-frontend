import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearch, durationSwitch }) {
  const localStorageValue = localStorage.getItem("saveSearchValue");
  const localChecked = localStorage.getItem("saveCheck");

  const location = useLocation();

  const [checked, setChecked] = useState(localChecked ?? "0");
  const [value, setValue] = useState(localStorageValue ?? "");

  const handleSubmit = (event) => {
    event.preventDefault();
    setChecked("0");
    handleSearch(value);
  };

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setChecked("0");
      handleSearch(value);
      setValue("");
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("saveSearchValue", value);
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
          />
          <span className="search__error"></span>
          <button type="submit" className="search__button"></button>
        </form>
        <FilterCheckbox
          setChecked={setChecked}
          checked={checked}
          durationSwitch={durationSwitch}
        />
      </div>
    </section>
  );
}

export default SearchForm;
