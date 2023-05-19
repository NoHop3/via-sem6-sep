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
  try {
    const res = await axios.get(`${endpoints.getOmdbMovieWith(id)}`);
    return res.data.Poster === "N/A" ? "" : res.data.Poster;
  } catch (err) {
    console.error(err);
    return "";
  }
};
