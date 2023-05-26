import {
  getMovieDetailsFor,
  getMovieWith,
  getMovies,
  setFavorite,
  setUserReview,
  getUserReview,
  getMovieReviews,
} from "./movie-service";

import { getPeople } from "./people-service";

import { search } from "./search-service";

import { signIn, signUp } from "./user-service";

export const services = {
  getMovieWith,
  getMovies,
  getMovieDetailsFor,
  setFavorite,
  setUserReview,
  getUserReview,
  getMovieReviews,
  getPeople,
  search,
  signIn,
  signUp,
};
