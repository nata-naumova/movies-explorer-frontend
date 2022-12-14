import "./FilterCheckbox.css";

function FilterCheckbox({ checked, setChecked, durationSwitch }) {
  const handleChange = () => {
    setChecked(!checked);
    durationSwitch(checked);
  };

  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__input"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="filter" className="filter__label"></label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
