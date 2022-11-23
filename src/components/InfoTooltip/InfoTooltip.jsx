import './InfoTooltip.css';

function InfoTooltip({ isOpen, titleText, popupText, submitText, onClose }) {
    return(
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h3 className="popup__title">{titleText}</h3>
                <p className="popup__text">{popupText}</p>
                <button type="button" onClick={onClose} className="popup__button popup__submit">{submitText}</button>
                <button type="button" onClick={onClose} className="popup__button popup__close"></button>
            </div>
        </section>
    );
}
export default InfoTooltip;