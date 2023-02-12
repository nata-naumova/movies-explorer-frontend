//export const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.movies-explorer.nata.nomoredomains.icu";
const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const SUCCESSFUL_LOGIN = "Добро пожаловать";
const SUCCESSFUL_REGISTER = "Вы успешно зарегистрировались!";
const SUCCESSFUL_UPDATEPROFILE = "Данные успешно изменены!";

/* --- Авторизация пользователя --- */
const ERROR_LOGINORPASS = "Вы ввели неправильный логин или пароль.";
const ERROR_TOKEN =
  "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
const ERROR_TOKENINCORRECT =
  "При авторизации произошла ошибка. Переданный токен некорректен.";

/* --- Регистрация пользователя / Обновление профиля --- */
const ERROR_CONFLICTEMAIL = "Пользователь с таким email уже существует.";
const ERROR_REGISTER = "При регистрации пользователя произошла ошибка.";
const ERROR_UPDATEUSER = "При обновлении профиля произошла ошибка.";

/* --- Ответ с сервера --- */
const ERROR_INTERNALSERVER = "500 На сервере произошла ошибка.";
const ERROR_NOTFOUND = "404 Страница по указанному маршруту не найдена.";

/* --- Параметр фильтра: Короткометражки --- */
const DURATION_MOVIE = 40;

/* --- Количество отображаемых карточек --- */
const COLUMN_L = 12;
const COLUMN_M = 8;
const COLUMN_S = 5;

const ROW_L = 3;
const ROW_M = 2;
const ROW_S = 1;

/* --- Поиск --- */
const SEARCH_ERRORMOVIES = "Фильмы не удалось получить";
const SEARCH_ERRORSAVEDMOVIES = "Сохраненные фильмы не удалось получить";

/* --- ВАЛИДАЦИЯ --- */
const SEARCH_EMPTY = "Нужно ввести ключевое слово";
const SEARCH_NOTFOUND = "По вашему запросу ничего не найдено";
const ERROR_NAME = "Поле содержит только латиницу, кириллицу, пробел или дефис";
const ERROR_EMAIL = "Некорректый адрес почты.";

/* --- Валидация имени: Только латиница, кириллица, пробел или дефис. --- */
const REGEX_NAME = "^[A-Za-zА-Яа-яЁё /s -]+$";

export {
  BASE_URL,
  MOVIE_URL,
  SUCCESSFUL_REGISTER,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_UPDATEPROFILE,
  ERROR_LOGINORPASS,
  ERROR_TOKEN,
  ERROR_TOKENINCORRECT,
  ERROR_CONFLICTEMAIL,
  ERROR_REGISTER,
  ERROR_UPDATEUSER,
  ERROR_INTERNALSERVER,
  ERROR_NOTFOUND,
  SEARCH_ERRORMOVIES,
  COLUMN_L,
  COLUMN_M,
  COLUMN_S,
  ROW_L,
  ROW_M,
  ROW_S,
  DURATION_MOVIE,
  SEARCH_NOTFOUND,
  ERROR_NAME,
  ERROR_EMAIL,
  SEARCH_EMPTY,
  SEARCH_ERRORSAVEDMOVIES,
  REGEX_NAME,
};
