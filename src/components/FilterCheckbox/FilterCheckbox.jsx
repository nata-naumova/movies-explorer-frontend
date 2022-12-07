import "./FilterCheckbox.css";

function FilterCheckbox({ checked, setChecked, durationSwitch }) {
  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__input"
        onClick={() => {
          setChecked(checked === "0" ? "1" : "0");
          durationSwitch(checked);
        }}
      />
      <label htmlFor="filter" className="filter__label"></label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
