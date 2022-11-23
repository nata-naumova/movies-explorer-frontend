import './FilterCheckbox.css';

function FilterCheckbox({ checked = false, onChange }) {
    return(
        <div className="filter">
            <input id="filter" type="checkbox" checked={checked} onChange={onChange} className="filter__input" />
            <label htmlFor="filter" className="filter__label"></label>
            <span className="filter__text">Короткометражки</span>
        </div>
        
    );
}

export default FilterCheckbox;