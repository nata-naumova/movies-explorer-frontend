import "./App.css";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import useLookWindowSize from "../../hooks/useLookWindowSize";

// Компоненты
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";

import {
  SUCCESSFUL_REGISTER,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_UPDATEPROFILE,
  ERROR_LOGINORPASS,
  ERROR_TOKEN,
  ERROR_CONFLICTEMAIL,
  ERROR_REGISTER,
  ERROR_UPDATEUSER,
  SEARCH_ERRORMOVIES,
  COLUMN_L,
  COLUMN_M,
  COLUMN_S,
  ROW_L,
  ROW_M,
  ROW_S,
  DURATION_MOVIE,
  SEARCH_ERRORSAVEDMOVIES,
} from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const { width } = useLookWindowSize();

  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupText, setPopupText] = useState("");

  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);

  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const location = useLocation();

  /* Авторизация пользователя */
  function handleSubmitLogin(input) {
    auth
      .login(input)
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", user.token);
        handleCheckToken();
        setPopupText(SUCCESSFUL_LOGIN);
        handleInfoTooltip();
        navigate("/movies");
      })
      .catch((error) => {
        console.log(`${error}: ${ERROR_LOGINORPASS}`);
        setPopupText(ERROR_LOGINORPASS);
        handleInfoTooltip();
      });
  }

  /* Регистрация пользователя */
  function handleSubmitRegister(input) {
    auth
      .register(input)
      .then(() => {
        setPopupText(SUCCESSFUL_REGISTER);
        handleSubmitLogin({
          email: input.email,
          password: input.password,
        });
        handleInfoTooltip();
      })
      .then(() => navigate("/movies"))
      .catch((error) => {
        if (error === 409) {
          setPopupText(ERROR_CONFLICTEMAIL);
          handleInfoTooltip();
        } else {
          console.log(`${error}: ${ERROR_REGISTER}`);
        }
      });
  }

  /* Редактируем данные пользователя */
  function handleUpdateUser(user) {
    auth
      .updateUserInfo(jwt, user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        setPopupText(SUCCESSFUL_UPDATEPROFILE);
      })
      .catch((error) => {
        if (error === 409) {
          setPopupText(ERROR_CONFLICTEMAIL);
        } else {
          setPopupText(ERROR_UPDATEUSER);
        }
      })
      .finally(handleInfoTooltip);
  }

  /* Выходим из аккаунта */
  function handleLogout() {
    localStorage.clear();
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("data");
    setCurrentUser(null);
    setLoggedIn(false);
    setSavedMoviesFilter([]);
    setFilteredMovies([]);
    setLocalSavedData([]);
    setPopupText("");
    navigate("/");
  }

  /* Проверка токена */
  const handleCheckToken = () => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => {
          console.log(`${err}: ${ERROR_TOKEN}`);
          handleLogout();
        });
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies");
    }
  }, [loggedIn]);

  /* Получаем информацию о пользователе */
  useEffect(() => {
    if (loggedIn) {
      auth
        .getUserInfo(jwt)
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  /* Получаем список фильмов */
  useEffect(() => {
    setIsLoading(true);
    if (jwt) {
      MoviesApi.getMovies()
        .then((result) => {
          localStorage.setItem("data", JSON.stringify(result));
          const allMovies = JSON.parse(localStorage.getItem("data"));
          setLocalData(allMovies);
        })
        .catch((error) => {
          console.log(`${error}: ${SEARCH_ERRORMOVIES}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [jwt]);

  /* Отображаем кол-во карточек */
  useEffect(() => {
    if (width >= 1280) {
      setCount(COLUMN_L);
      setNumber(ROW_L);
    } else if (width >= 768 && width <= 1279) {
      setCount(COLUMN_M);
      setNumber(ROW_M);
    } else if (width <= 320 && width <= 468) {
      setCount(COLUMN_S);
      setNumber(ROW_S);
    }
  }, [width]);

  /* Получаем список сохраненных фильмов */
  useEffect(() => {
    if (loggedIn && currentUser) {
      MainApi.getMovies(jwt)
        .then((res) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(res.filter((i) => i.owner === currentUser._id))
          );
          const userMovies = JSON.parse(localStorage.getItem("savedMovies"));
          setLocalSavedData(userMovies);
        })
        .catch((err) => {
          console.log(`${err}: ${SEARCH_ERRORSAVEDMOVIES}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn, currentUser]);

  /* Сохраняем фильм */
  function handleSaveMovie(card) {
    const like = localSavedData.some((i) => i.movieId === card.id);
    if (!like) {
      MainApi.saveMovie(card, jwt).then((res) => {
        setLocalSavedData([...localSavedData, res]);
      });
    } else {
      const dislike = localSavedData.find((i) => i.movieId === card.id);
      handleDeleteMovie(dislike);
    }
  }

  /* Удаляем фильм */
  function handleDeleteMovie(card) {
    MainApi.deleteMovie(card, jwt).then(() => {
      setSavedMoviesFilter(savedMoviesFilter.filter((i) => i._id !== card._id));
      setLocalSavedData(localSavedData.filter((i) => i._id !== card._id));
    });
  }

  /* Поиск - Список найденых по слову фильмов */
  function handleSearch(value) {
    const sortedMovieSearch = localData.filter((item) => {
      const values = value.toLowerCase();
      const nameRU = item.nameRU.toLowerCase();
      const nameEN = item.nameEN;
      return (nameEN &&
        nameEN.toLowerCase().includes(values) &&
        values !== "") ||
        (nameRU && nameRU.toLowerCase().includes(values) && value !== "")
        ? item
        : null;
    });
    localStorage.setItem("filtered", JSON.stringify(sortedMovieSearch));
    setFilteredMovies(sortedMovieSearch);
  }

  /* Список сохраненных фильмов  */
  function handleSavedMoviesSearch(value) {
    const sortedMovieSearch = localSavedData.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN;
      const nameRU = card.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(values)) ||
        (nameRU && nameRU.toLowerCase().includes(value))
        ? card
        : null;
    });
    localStorage.setItem("savedFilter", JSON.stringify(sortedMovieSearch));
    setSavedMoviesFilter(
      sortedMovieSearch.length !== 0 ? sortedMovieSearch : localSavedData
    );
  }

  /* Фильтр поиска по длительности фильмов */
  const durationSwitch = (saveCheck) => {
    const filterMovies = JSON.parse(localStorage.getItem("filtered"));
    if (saveCheck && filterMovies) {
      const shorts = filterMovies.filter(
        (item) => item.duration <= DURATION_MOVIE
      );
      setFilteredMovies(shorts);
    } else {
      setFilteredMovies(filterMovies);
    }
  };

  /* Фильтр поиска по длительности сохраненных фильмов */
  function savedDurationSwitch(saveCheck) {
    const savedFiltered = JSON.parse(localStorage.getItem("savedFilter"));
    if (saveCheck && savedFiltered) {
      const shorts = savedFiltered.filter(
        (item) => item.duration <= DURATION_MOVIE
      );
      setSavedMoviesFilter(shorts);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

  /* Кнопка "Еще" */
  function handleMoreButton() {
    setCount(count + number);
  }

  /* Модальные окна */
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="/signin"
            element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Login onSubmit={handleSubmitLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Register onSubmit={handleSubmitRegister} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  isLoading={isLoading}
                  currentUser={currentUser}
                  handleSearch={handleSearch}
                  savedMovies={localSavedData}
                  movieCards={filteredMovies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  durationSwitch={durationSwitch}
                  handleMoreButton={handleMoreButton}
                  count={count}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  isLoading={isLoading}
                  movieCards={savedMoviesFilter}
                  handleSearch={handleSavedMoviesSearch}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMoviesFilter}
                  durationSwitch={savedDurationSwitch}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  handleLogout={handleLogout}
                  handleUpdateUserInfo={handleUpdateUser}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={infoTooltip}
          onClose={closeAllPopups}
          popupText={popupText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
