import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleLogout, handleUpdateUserInfo, message }) {
  /* Подписка на контекст */
  const currentUser = useContext(CurrentUserContext);
  /* Перемменные состояния */
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [status, setStatus] = useState(true);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  /* Передаем значения во внешний обработчик */
  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateUserInfo({
      name: name,
      email: email,
    });
  }

  useEffect(() => {
    if (name !== currentUser.name || email !== currentUser.email) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [
    handleNameChange,
    handleEmailChange,
    name,
    email,
    currentUser.name,
    currentUser.email,
  ]);

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
              defaultValue={currentUser.name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor="input-email" className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              type="text"
              id="input-email"
              name="email"
              className="profile__input"
              required
              defaultValue={currentUser.email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div className="profile__buttons">
          <span className="profile__error">{message}</span>
          <button
            type="submit"
            className={`${
              status ? "profile__button profile__button-edit" : "profile__btn"
            }`}
            aria-label="Редактирование профиля"
            disabled={status}
          >{`${status ? "Редактировать" : "Сохранить"}`}</button>
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
