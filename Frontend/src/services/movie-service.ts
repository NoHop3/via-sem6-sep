/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsLoading,
  setMovie,
  setMovies,
  setTotal,
  setUserReview as setUserReviewAction,
} from "../shared/store/movie-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";
import { Person } from "../shared/models/person";
import { MovieRating } from "../shared/models/rating";
import { MovieDetails, UserReview } from "../shared/models/movie";

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
    const [movie, stars, director, posterUrl, reviews, details] =
      await Promise.all([
        axios.get(`${endpoints.getMovieWith(id)}`),
        getMovieStarsFor(id),
        getMovieDirectorFor(id),
        getMoviePosterFor(id),
        getMovieReviews(id),
        getOmdbMovieDetailsFor(id),
      ]);
    dispatch(
      setMovie({
        ...movie.data,
        posterUrl,
        details,
        reviews,
        stars,
        director,
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
  (skip: number, take: number, userId?: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axios.get(
        `${endpoints.getMovies((skip - 1) * 12, take)}`,
      );
      const moviesWithMoreData = await Promise.all(
        res.data.movies.map(async (movie: any) => {
          const posterUrl = await getMoviePosterFor(movie.id);
          const rating = await getMovieRatingFor(movie.id);
          const favorite = userId ? await getFavorite(userId, movie.id) : false;
          return { ...movie, posterUrl, favorite, rating };
        }),
      );
      dispatch(setMovies(moviesWithMoreData));
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

// #region getFavoriteMovie
export const getFavorite = async (
  userId: number,
  movieId: number,
): Promise<any> => {
  try {
    const res = await axios.get(
      `${endpoints.getFavoriteMovie(userId, movieId)}`,
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
// #endregion

// #region setFavoriteMovie
export const setFavorite =
  (userId: number, movieId: number) => async (dispatch: any) => {
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
      console.error(err);
    }
  };
// #endregion

// #region getUserReview
export const getUserReview =
  (userId: number, movieId: number) => async (dispatch: any) => {
    await axios
      .get(`${endpoints.getUserReview(userId, movieId)}`)
      .then((res) => {
        dispatch(setUserReviewAction(res.data));
        dispatch(
          setNotification({
            open: true,
            type: "success",
            message: `User review was fetched successfully!`,
          }),
        );
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setNotification({
            open: true,
            type: "error",
            message: `Could not get user review!`,
          }),
        );
      });
  };
// #endregion

// #region setUserReview
export const setUserReview =
  (userId: number, movieId: number, review: UserReview) =>
  async (dispatch: any) => {
    try {
      await axios.post(endpoints.setUserReview(), {
        data: {
          userId,
          movieId,
          reviewText: review.reviewText,
        },
      });
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
      console.error(err);
    }
  };
// #endregion

// #region getMovieReviews
export const getMovieReviews = async (movieId: number): Promise<any> => {
  try {
    const res = await axios.get(`${endpoints.getMovieReviews(movieId)}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
// #endregion
