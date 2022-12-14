import { MOVIE_URL } from "./constants";

export const getMovies = () => {
  return fetch(MOVIE_URL, {
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
