export function isEmail(string) {
  return string && /[^@\s]+@[^@\s]+\.[^@\s]+/.test(string);
}

export function isName(string) {
  return string && /^[a-zа-я\s-]+$/i.test(string);
}

const errors = {
  401: "Ошибка авторизации в удаленном ресурсе",
};

export function decodeError(error = {}) {
  return errors[error.errorCode] || "Произошла ошибка";
}
