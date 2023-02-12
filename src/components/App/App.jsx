import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
  SEARCH_ERRORSAVEDMOVIES,
} from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupText, setPopupText] = useState("");

  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
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
        console.log(user);
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
    setCurrentUser(null);
    setLoggedIn(false);
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
          setCurrentUser(res);
          navigate(location);
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
          localStorage.setItem("moviesApi", JSON.stringify(result));
          const allMovies = JSON.parse(localStorage.getItem("moviesApi"));
          setLocalData(allMovies);
        })
        .catch((error) => {
          console.log(`${error}: ${SEARCH_ERRORMOVIES}`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [jwt]);

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
      //setSavedMoviesFilter(savedMoviesFilter.filter((i) => i._id !== card._id));
      setLocalSavedData(localSavedData.filter((i) => i._id !== card._id));
    });
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
                  savedMovies={localSavedData}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
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
                  onDelete={handleDeleteMovie}
                  savedMovies={localSavedData}
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
