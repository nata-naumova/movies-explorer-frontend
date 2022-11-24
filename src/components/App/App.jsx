import './App.css';

import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

// Компоненты
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

// Контент на страниц
import moviesCards from '../../utils/movies';

function App() {
  /* Переменные состояния */
  const [InfoTooltipIsOpened, setInfoTooltipIsOpened] = useState(false);
  const [isLoader, setIsLoader] =useState(false);
  /*
  const openInfoTooltip = () => {
    setInfoTooltipIsOpened(true);
  };
  */
  const closeAllPopups = () => {
    setInfoTooltipIsOpened(false);
  }

  return (
    <div className="App">
      <InfoTooltip 
        isOpen={InfoTooltipIsOpened}
        titleText='Что-то пошло не так!'
        popupText='Попробуйте еще раз'
        submitText='OK'
        onClose={closeAllPopups}
      />
      <Routes>
        <Route path='/' element={<><Header isLogged={false} /><Main /><Footer /></>} />
        <Route path='/movies' setIsLoader={setIsLoader} element={<><Header /><Movies cardsData={moviesCards} /><Footer /></>} />
        <Route path='/saved-movies' element={<><Header /><SavedMovies /><Footer /></>} />
        <Route path='/profile' element={<><Header /><Profile /></>} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Preloader /> */}
    </div>
  );
}

export default App;
