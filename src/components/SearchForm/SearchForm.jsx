import './SearchForm.css';
import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {

    const [isChecked, setChecked] = useState(false);

    function handleChange({ target: { checked: newState } }) {
        setChecked(newState);
    }

    return(
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <span className="search__icon"></span>
                    <input type="text" className="search__input" placeholder='Фильм' />
                    <span className="search__error"></span>
                    <button type='submit' className="search__button"></button>
                </form>
                <FilterCheckbox checked={isChecked} onChange={handleChange} />
            </div>
        </section>
    );
}

export default SearchForm;