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
    const [movie, stars, director, rating, posterUrl] = await Promise.all([
      axios.get(`${endpoints.getMovieWith(id)}`),
      getMovieStarsFor(id),
      getMovieDirectorFor(id),
      getMovieRatingFor(id),
      getMoviePosterFor(id),
    ]);
    dispatch(
      setMovie({
        ...movie.data,
        posterUrl,
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
    return { id: 0, rating: 0, votes: 0, movie: { id: 0, title: "", year: 0 } };
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
  const defaultPosterUrl =
    "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";
  try {
    const res = await axios.get(`${endpoints.getOmdbMovieWith(id)}`);
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
