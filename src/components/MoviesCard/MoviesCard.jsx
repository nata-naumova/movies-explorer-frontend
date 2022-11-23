import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ isFavourite, name, duration, image }) {
    const [isAddFavourite, setIsAddFavourite] = useState(isFavourite);

    function converseDuration(value) {
        let minutes;
        const stringValue = String(value);
        if(/\d*[1]$/.test(stringValue)) {
            minutes = 'минута';
        } else if(/\d*[2-4]$/.test(stringValue)) {
            minutes = 'минуты';
        } else if(/\d*[5-90]$/.test(stringValue)) {
            minutes = 'минут';
        } else {
            minutes = '';
        }
        return minutes;
    }
    const stringDuration = converseDuration(duration);

    function handleCard() {
        setIsAddFavourite(!isAddFavourite);
    }

    return(
        <li className="movies-card">
            <article className="movies-card__item">
                <a href='/' target="_blank">
                    <img src={image} alt="Изображение фильма" className="movies-card__image" />
                </a>
                <div className="movies-card__text">
                    <h3 className="movies-card__title">{name}</h3>
                    <button
                    className= {`movies-card__button ${isAddFavourite ? 'movies-card__button_type_saved' : 'movies-card__button_type_save'}`}
                    onClick={handleCard}
                    ></button>
                </div>
                <span className="movies-card__duration">{`${duration} ${stringDuration}`}</span>
            </article>
        </li>
    );
}

export default MoviesCard;