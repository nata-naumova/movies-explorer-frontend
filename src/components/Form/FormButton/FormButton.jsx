import './FormButton.css';

function FormButton({caption}) {
    return(
        <button className="form__button" type="submit">{caption}</button>
    );
}

export default FormButton;