import './Form.css';
import Logo from '../../images/logo.svg';

import FormInput from './FormInput/FormInput';
import FormButton from './FormButton/FormButton';
import { Link } from 'react-router-dom';

function Form({ inputs, title, formName, buttonName, text, link, linkTarget }) {
    return(
        <form className="form" name={formName}>
            <Link to="/" className="form__logo">
                <img src={Logo} alt="Логотип сайта" />
            </Link>
            <h2 className="form__title">{title}</h2>
            <fieldset className="form__wrapper">
                {inputs.map(({caption, name}, i) => <FormInput key={i} label={caption} name={name} />)}
                <span className="form__error">Что-то пошло не так...</span>
            </fieldset>
            <fieldset className="form__wrapper">
                <FormButton caption={buttonName} />
                <span className="form__subtitle">
                    {text}
                    <Link to={linkTarget} className="form__link">{link}</Link>
                </span>
            </fieldset>
        </form>
    );
}

export default Form;