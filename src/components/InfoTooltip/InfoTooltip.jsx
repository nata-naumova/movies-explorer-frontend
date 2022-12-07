import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, popupText }) {
  function handleClick() {
    onClose();
  }
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h3 className="popup__title">Внимание</h3>
        <p className="popup__text">{popupText}</p>
        <button
          type="button"
          onClick={handleClick}
          className="popup__button popup__submit"
        >
          Ок
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="popup__button popup__close"
        ></button>
      </div>
    </section>
  );
}
export default InfoTooltip;
