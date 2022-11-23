/* Страница логина пользователя */
const errorLoginOrPassword = 'Вы ввели неправильный логин или пароль.';
const errorToken = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
const errorTokenIncorrect = 'При авторизации произошла ошибка. Переданный токен некорректен.';

/* Страница регистрации пользователя */
const errorEmailDublicate = 'Пользователь с таким email уже существует.';
const errorRegistration = 'При регистрации пользователя произошла ошибка.';

/* Страница обновления профиля */
const errorUpdateProfile = 'При обновлении профиля произошла ошибка.';

/* Другое */
const errorServer = '500 На сервере произошла ошибка.';
const errorLink = '404 Страница по указанному маршруту не найдена.';

module.exports = {
    errorLoginOrPassword,
    errorToken,
    errorTokenIncorrect,
    errorEmailDublicate,
    errorRegistration,
    errorUpdateProfile,
    errorServer,
    errorLink
}