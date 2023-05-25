/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsLoading,
  setMovie,
  setMovies,
  setTotal,
} from "../shared/store/movie-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";
import { Person } from "../shared/models/person";
import { MovieRating } from "../shared/models/rating";
import { MovieDetails } from "../shared/models/movie";

// #region getMovieWithId
export const getMovieWith = (id: number) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .get(`${endpoints.getMovieWith(id)}`)
    .then((res: any) => {
      dispatch(setMovie(res.data));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Movie with id ${id} was fetched successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Movie with id ${id} was not fetched!`,
        }),
      );
      throw err;
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
// #endregion

// #region getMovieDetails
export const getMovieDetailsFor = (id: number) => async (dispatch: any) => {
  dispatch(setIsLoading(true));
  try {
    const [movie, stars, director, rating, posterUrl, details] =
      await Promise.all([
        axios.get(`${endpoints.getMovieWith(id)}`),
        getMovieStarsFor(id),
        getMovieDirectorFor(id),
        getMovieRatingFor(id),
        getMoviePosterFor(id),
        getOmdbMovieDetailsFor(id),
      ]);
    dispatch(
      setMovie({
        ...movie.data,
        posterUrl,
        details,
        stars,
        director,
        rating,
      }),
    );
    dispatch(
      setNotification({
        open: true,
        type: "success",
        message: `Movie details for id ${id} were fetched successfully!`,
      }),
    );
  } catch (err) {
    dispatch(
      setNotification({
        open: true,
        type: "error",
        message: `Movie details for id ${id} were not fetched!`,
      }),
    );
    throw err;
  } finally {
    dispatch(setIsLoading(false));
  }
};

const getMovieStarsFor = async (id: number): Promise<Person[]> => {
  try {
    const res = await axios.get(`${endpoints.getStarsForMovie(id)}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getMovieDirectorFor = async (id: number): Promise<Person[]> => {
  try {
    const res = await axios.get(`${endpoints.getDirectorsForMovie(id)}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getMovieRatingFor = async (id: number): Promise<MovieRating> => {
  try {
    const res = await axios.get(`${endpoints.getRatingForMovie(id)}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return { id: 0, rating: 0, votes: 0 };
  }
};

const getOmdbMovieDetailsFor = async (id: number): Promise<MovieDetails> => {
  try {
    // If id is less than 7 charaacters append 0s to the left
    const stringId = id.toString();
    const paddedId = stringId.padStart(7, "0");
    const res = await axios.get(`${endpoints.getOmdbMovieWith(paddedId)}`);
    return {
      rated: res.data.Rated,
      released: res.data.Released,
      runtime: res.data.Runtime,
      plot: res.data.Plot,
      genre: res.data.Genre,
      language: res.data.Language,
      country: res.data.Country,
    };
  } catch (err) {
    console.error(err);
    return {
      rated: "N/A",
      released: "N/A",
      runtime: "N/A",
      plot: "N/A",
      genre: "N/A",
      language: "N/A",
      country: "N/A",
    };
  }
};
// endregion

// #region getMovies
export const getMovies =
  (skip: number, take: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axios.get(
        `${endpoints.getMovies((skip - 1) * 12, take)}`,
      );
      const moviesWithPosters = await Promise.all(
        res.data.movies.map(async (movie: any) => {
          const posterUrl = await getMoviePosterFor(movie.id);
          return { ...movie, posterUrl };
        }),
      );
      dispatch(setMovies(moviesWithPosters));
      dispatch(setTotal(res.data.total));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Movies were fetched successfully!`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Movies were not fetched!`,
        }),
      );
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

const getMoviePosterFor = async (id: number): Promise<string> => {
  // If id is less than 7 charaacters append 0s to the left
  const stringId = id.toString();
  const paddedId = stringId.padStart(7, "0");
  const defaultPosterUrl =
    "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";
  try {
    const res = await axios.get(`${endpoints.getOmdbMovieWith(paddedId)}`);
    if (res.data.Poster) {
      return res.data.Poster === "N/A" ? defaultPosterUrl : res.data.Poster;
    }
    return defaultPosterUrl;
  } catch (err) {
    console.error(err);
    return defaultPosterUrl;
  }
};
// #endregion

// #region setFavorite
export const setFavorite =
  (userId: number, movieId: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      await axios.post(`${endpoints.setFavoriteMovie(userId, movieId)}`);
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Movie with id ${movieId} was favorited/unfavorited successfully!`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Could not favorite/unfavorite movie!`,
        }),
      );
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
// #endregion

// #region getFavoriteMovies
export const getFavoriteMovies =
  (userId: number, skip: number, take: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axios.get(
        `${endpoints.getFavoriteMovies(userId, (skip - 1) * 12, take)}`,
      );
      const moviesWithPosters = await Promise.all(
        res.data.movies.map(async (movie: any) => {
          const posterUrl = await getMoviePosterFor(movie.id);
          return { ...movie, posterUrl };
        }),
      );
      dispatch(setMovies(moviesWithPosters));
      dispatch(setTotal(res.data.total));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Favorite movies were fetched successfully!`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Favorite movies were not fetched!`,
        }),
      );
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
// #endregion

// #region setUserRating
export const setUserRating =
  (userId: number, movieId: number, rating: number) =>
  async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      await axios.post(`${endpoints.setUserRating(userId, movieId, rating)}`);
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Movie with id ${movieId} was rated successfully!`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Could not rate movie!`,
        }),
      );
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
