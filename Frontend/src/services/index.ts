import {
  getMovieDetailsFor,
  getMovieWith,
  getMovies,
  getFavoriteMovies,
  setFavorite,
  setUserRating,
} from "./movie-service";

import { getPeople } from "./people-service";

import { search } from "./search-service";

import { signIn, signUp } from "./user-service";

export const services = {
  getMovieWith,
  getMovies,
  getMovieDetailsFor,
  setFavorite,
  setUserRating,
  getFavoriteMovies,
  getPeople,
  search,
  signIn,
  signUp,
};
