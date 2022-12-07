const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const getMovies = () => {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getJson);
};

const getJson = (response) => {
  if (response.ok) {
    return response.json();
  }
  return console.log(
    "Ошибка на сервере: " + response.status + " - " + response.statusText
  );
};
