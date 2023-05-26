/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY!;
const omdbUrl = "https://www.omdbapi.com/";
export const endpoints = {
  // #region MovieController
  getMovies: (skip: number, take: number) =>
    `${baseUrl}/Movie?=${skip}&=${take}`,
  getMovieWith: (id: number) => `${baseUrl}/Movie/${id}`,
  getStarsForMovie: (id: number) => `${baseUrl}/Movie/${id}/Stars`,
  getDirectorsForMovie: (id: number) => `${baseUrl}/Movie/${id}/Directors`,
  // #endregion
  // #region PersonController
  getPeople: (skip: number, take: number) =>
    `${baseUrl}/Person?=${skip}&=${take}`,
  getPersonMovies: (id: number) => `${baseUrl}/Person/${id}/Movies`,
  // #endregion
  // #region MoviewRatingController
  getRatingForMovie: (id: number) => `${baseUrl}/MovieRating/${id}`,
  // #endregion
  // #region OmdbAPI
  getOmdbMovieWith: (id: string) => `${omdbUrl}?i=tt${id}&apikey=${omdbApiKey}`,
  // #endregion
  // #region ReviewController
  setUserReview: () => `${baseUrl}/Review`,
  getUserReview: (userId: number, movieId: number) =>
    `${baseUrl}/Review/${userId}/${movieId}`,
  getMovieReviews: (movieId: number) => `${baseUrl}/Review/${movieId}`,
  // #endregion
  // #region FavoriteController
  setFavoriteMovie: (userId: number, movieId: number) =>
    `${baseUrl}/Favourite/${userId}/${movieId}`,
  getFavoriteMovie: (userId: number, movieId: number) =>
    `${baseUrl}/Favourite/${userId}/${movieId}`,
  // #endregion
  // #region SearchController
  search: (searchPhrase: string) =>
    `${baseUrl}/Search?searchPhrase=${searchPhrase}`,
  // #endregion
  // #region AuthenticationController
  signIn: () => `${baseUrl}/Authentication/Login`,
  signUp: () => `${baseUrl}/Authentication/Register`,
  // #endregion
};
