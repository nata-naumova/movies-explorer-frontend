import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cardsData}) {
    return(
        <section className="movies-list">
            <ul className="movies__list">
                {cardsData.length === 0 ? <li className="movies__item-empty">Фильмов не найдено</li> : cardsData.map((film) => (
                    <MoviesCard 
                        key={film.id}
                        isFavourite={film.isFavourite}
                        name={film.name}
                        duration={film.duration}
                        image={film.image}
                    />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;