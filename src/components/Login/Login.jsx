import "../Form/Form.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";

function Login({ onSubmit }) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
  }

  return (
    <main className="auth">
      <form className="form" onSubmit={handleSubmit}>
        <Link to="/" className="form__logo">
          <img src={Logo} alt="Логотип сайта" />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <fieldset className="form__wrapper">
          <label className="form__label">
            E-mail
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="E-mail"
              minLength="2"
              maxLength="64"
              onChange={handleChange}
              required
            />
            <span className="form__error">{errors.email}</span>
          </label>
          <label className="form__label">
            Пароль
            <input
              className="form__input"
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              required
            />
            <span className="form__error">{errors.password}</span>
          </label>
        </fieldset>
        <fieldset className="form__wrapper">
          <button
            className={`form__button ${!isValid && "form__button_disabled"}`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
          <span className="form__subtitle">
            Ещё не зарегистрированы?
            <Link to="/signup" className="form__link">
              Регистрация
            </Link>
          </span>
        </fieldset>
      </form>
    </main>
  );
}

export default Login;
