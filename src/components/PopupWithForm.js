function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={isOpen ? `popup ${name}-popup popup_opened` : `popup ${name}-popup`}>
      <div className="popup__container">
        <form onSubmit={onSubmit} className="popup__form" name={name}>
          <fieldset className="popup__form-set">
            <button type="button" className="popup__button-close" onClick={onClose}></button>
            <h2 className="popup__header">{title}</h2>
            {children}
            <button type="submit" className="popup__button-submit avatar-popup__button-submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
