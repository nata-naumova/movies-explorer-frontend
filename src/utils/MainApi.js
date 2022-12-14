import { BASE_URL } from "./constants";

const getJson = (response) => {
  return response.ok ? response.json() : Promise.reject(response.status);
};

export const getMovies = (jwt) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getJson);
};

export const saveMovie = (movie, jwt) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: movie.country ?? "1",
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      nameEN: movie.nameEN ?? movie.nameRU,
      nameRU: movie.nameRU,
      trailer: movie.trailerLink
        ? movie.trailerLink
        : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
      year: movie.year,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    }),
  }).then(getJson);
};

export const deleteMovie = (movie, jwt) => {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getJson);
};
