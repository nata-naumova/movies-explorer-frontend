import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { REGEX_NAME } from "../../utils/constants";

function Profile({ handleLogout, handleUpdateUserInfo }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();
  /* Подписка на контекст */
  const currentUser = useContext(CurrentUserContext);
  /* Перемменные состояния */
  const [status, setStatus] = useState(false);

  /* Передаем значения во внешний обработчик */
  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      handleUpdateUserInfo(values);
    }
  }

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  return (
    <main className="profile">
      <form
        method="POST"
        name="profile"
        className="profile__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <div className="profile__container">
          <label htmlFor="input-name" className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              type="text"
              id="input-name"
              name="name"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
              defaultValue={values.name}
              onChange={handleChange}
              pattern={REGEX_NAME}
            />
          </label>
          <span className="profile__error">{errors.name}</span>
          <label htmlFor="input-email" className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              type="text"
              id="input-email"
              name="email"
              className="profile__input"
              required
              defaultValue={values.email}
              onChange={handleChange}
            />
          </label>
          <span className="profile__error">{errors.email}</span>
        </div>
        <div className="profile__buttons">
          <button
            type="submit"
            className={`${
              !isValid ? "profile__button profile__button-edit" : "profile__btn"
            }`}
            aria-label="Редактирование профиля"
            disabled={!isValid}
          >{`${isValid ? "Сохранить" : "Редактировать"}`}</button>
          <button
            type="button"
            onClick={handleLogout}
            className="profile__button profile__button-exit"
            aria-label="Выйти из аккаунта"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
