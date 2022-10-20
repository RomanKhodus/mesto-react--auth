export const options = {
  formSelector: ".popup__form",
  formSet: ".popup__form-set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  inputErrorSelector: ".popup__input-error",
  errorClass: "popup__input-error_visible",
  inputInvalidClass: "popup__input_invalid",
};

export const API_CONFIG = {
  baseUrl: "https://api.place.students.nomoredomains.icu",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Credential: "include",
};


