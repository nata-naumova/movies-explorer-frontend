import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

function App() {
  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Статус авторизации / загрузки
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //Отображение карточек
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const { width } = useLookWindowSize();
  // Уведомления
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupText, setPopupText] = useState("");
  // Списки фильмов
  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
  // Поиск фильмов
  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // Токен
  const jwt = localStorage.getItem("jwt");
  // Хук для перемещения
  const navigate = useNavigate();

  /* Проверка токена */
  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          console.log(
            `Токен не передан или передан не в том формате. Ошибка: ${error}`
          );
        });
    }
  }, [jwt]);

  /* Получаем информацию о пользователе */
  useEffect(() => {
    if (jwt) {
      auth
        .getUserInfo(jwt)
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }, [jwt]);

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
          console.log(`Фильмы не удалось получить: ${error}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [jwt]);

  /* Отображаем кол-во карточек */
  useEffect(() => {
    if (width >= 1280) {
      setCount(12); //карточка
      setNumber(3); //ряд
    } else if (width >= 768 && width <= 1279) {
      setCount(8);
      setNumber(2);
    } else if (width <= 320 && width <= 468) {
      setCount(5);
      setNumber(1);
    }
  }, [width]);

  /* Получаем список сохраненных фильмов */
  useEffect(() => {
    setIsLoading(true);
    if (jwt && currentUser !== null) {
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
          console.log(`Сохраненные фильмы не удалось получить: ${err}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [jwt, currentUser]);

  /* Авторизация пользователя */
  function handleSubmitLogin(input) {
    auth
      .login(input)
      .then((user) => {
        localStorage.setItem("jwt", user.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((error) => {
        console.log(`Ошибка входа: ${error}`);
        setPopupText("Неверный логин или пароль");
        handleInfoTooltip();
      });
  }

  /* Регистрация пользователя */
  function handleSubmitRegister(input) {
    auth
      .register(input)
      .then(() => {
        setPopupText("Вы успешно зарегистрировались!");
        handleSubmitLogin({
          email: input.email,
          password: input.password,
        });
        handleInfoTooltip();
      })
      .then(() => navigate("/movies"))
      .catch((error) => {
        console.log(`Ошибка входа: ${error}`);
      });
  }

  /* Выходим из аккаунта */
  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("movieList");
    localStorage.removeItem("data");
    localStorage.removeItem("saveSearchValue");
    localStorage.removeItem("saveCheck");
    localStorage.removeItem("filtered");
    localStorage.removeItem("savedFilter");
    setCurrentUser(null);
    setLoggedIn(false);
    setSavedMoviesFilter([]);
    setFilteredMovies([]);
    setLocalSavedData([]);
    setPopupText("Вы вышли из аккаунта");
    navigate("/");
  }

  /* Редактируем данные пользователя */
  function handleUpdateUser(user) {
    auth
      .updateUserInfo(jwt, user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        setPopupText("Данные успешно изменены!");
      })
      .catch((error) => {
        if (error.includes(409)) {
          setPopupText("Пользователь с таким email уже существует");
        } else {
          setPopupText("При обновлении профиля произошла ошибка");
        }
      })
      .finally(handleInfoTooltip);
  }

  /* Блок поиска по фильмам */
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

  /* Сохраняем поиск */
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
    if (saveCheck === "1" && filterMovies) {
      const shorts = filterMovies.filter((item) => item.duration <= 40);
      setFilteredMovies(shorts);
    } else {
      setFilteredMovies(filterMovies);
    }
  };

  /* Фильтр поиска по длительности сохраненных фильмов */
  function savedDurationSwitch(saveCheck) {
    const savedFiltered = JSON.parse(localStorage.getItem("savedFilter"));
    if (saveCheck === "1" && savedFiltered) {
      const shorts = savedFiltered.filter((item) => item.duration <= 40);
      setSavedMoviesFilter(shorts);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

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
                <Register onSubmit={handleSubmitRegister} loggedIn={loggedIn} />
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
