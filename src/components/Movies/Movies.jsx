import './Movies.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from './More/More';

function Movies({cardsData}) {

    const [movies] = useState([...cardsData]);

    return(
        <main className="movies">
            <div className="movies__container">
                <SearchForm />
                <MoviesCardList cardsData={movies} />
                <More isVisible={movies.length > 0} />
            </div>
        </main>
    );
}

export default Movies;