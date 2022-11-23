import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
    const cardsData = [{
        id: 1,
        name: 'Вестсайдская история',
        duration: 156,
        image: 'https://www.kinonews.ru/insimgs/2021/shotimg/shotimg101355_4.jpg',
        isFavourite: false,
    }];
    return(
        <main className='movies'>
            <div className="movies__container">
                <SearchForm />
                <MoviesCardList cardsData={cardsData} />
            </div>
        </main>
    );

}

export default SavedMovies;