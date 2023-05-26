/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY!;
const omdbUrl = "https://www.omdbapi.com/";
export const endpoints = {
  getMovies: (skip: number, take: number) => `${baseUrl}/Movie/${skip}/${take}`,
  getPeople: (skip: number, take: number) =>
    `${baseUrl}/Person/${skip}/${take}`,
  getPersonMovies: (id: number) => `${baseUrl}/Person/${id}/Movies`,
  getMovieWith: (id: number) => `${baseUrl}/Movie/${id}`,
  getStarsForMovie: (id: number) => `${baseUrl}/Movie/${id}/Stars`,
  getDirectorsForMovie: (id: number) => `${baseUrl}/Movie/${id}/Directors`,
  getRatingForMovie: (id: number) => `${baseUrl}/MovieRating/${id}`,
  getOmdbMovieWith: (id: string) => `${omdbUrl}?i=tt${id}&apikey=${omdbApiKey}`,
  setFavoriteMovie: (userId: number, movieId: number) =>
    `${baseUrl}/Favourite/${userId}/${movieId}`,
  getFavoriteMovie: (userId: number, movieId: number) =>
    `${baseUrl}/Favourite/${userId}/${movieId}`,
  setUserRating: (userId: number, movieId: number, rating: number) =>
    `${baseUrl}/Review/${userId}/${movieId}/${rating}`,
  getUserRating: (userId: number, movieId: number) =>
    `${baseUrl}/Review/${userId}/${movieId}`,
  getFavoriteMovies: (userId: number, skip: number, take: number) =>
    `${baseUrl}/Favourite/${userId}/${skip}/${take}`,
  search: (searchPhrase: string) =>
    `${baseUrl}/Search?searchPhrase=${searchPhrase}`,
  signIn: () => `${baseUrl}/Authentication/Login`,
  signUp: () => `${baseUrl}/Authentication/Register`,
};
