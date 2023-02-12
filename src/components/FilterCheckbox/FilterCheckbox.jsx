import "./FilterCheckbox.css";

function FilterCheckbox({ value, onChange }) {
  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__input"
        checked={value}
        onChange={onChange}
      />
      <label htmlFor="filter" className="filter__label"></label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
