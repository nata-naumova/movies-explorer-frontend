import './Profile.css';
import { useState } from 'react';

function Profile() {
    /* Перемменные состояния */
    const [isName, setName] = useState('Ната');
    const [isEmail, setEmail] = useState('nata@ya.ru');
    const [status, setStatus] = useState(true);

    const errors = '';

    /* Получаем имя */
    function handleProfileNameChange(event) {
        setName(event.target.value);
    }
    /* Получаем email */
    function handleProfileEmailChange(event) {
        setEmail(event.target.value);
    }
    function handleStatusChange(e) {
        e.preventDefault();
        setStatus(!status);
    }

    return(
        <main className="profile">
            <form
                method="POST"
                name="profile"
                className="profile__form"
                noValidate
                >
                <h1 className="profile__title">Привет, {isName}</h1>
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
                            value={isName}
                            onChange={handleProfileNameChange}
                            disabled={status ? true: false}
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
                            value={isEmail}
                            onChange={handleProfileEmailChange}
                            disabled={status ? true: false}
                        />
                    </label>
                </div>
                <div className="profile__buttons">
                    <span className="profile__error">{errors || ''}</span>
                    <button
                        type="submit"
                        className={`${status ? 'profile__button profile__button-edit': 'profile__btn'}`}
                        aria-label="Редактирование профиля"
                        onClick={handleStatusChange}
                    >{status ? 'Редактировать': 'Сохранить'}</button>
                    <button
                        type="submit"
                        className="profile__button profile__button-exit"
                        aria-label="Выйти из аккаунта"
                        style={status ? {display:"block"}: {display:"none"}}
                    >Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    );
}

export default Profile;