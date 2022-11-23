import './FormInput.css';

function FormInput({label, name}) {
    return(
        <label className="form__label">
            {label}
            <input name="name" type="text" className="form__input" required />
        </label>
    );
}

export default FormInput;