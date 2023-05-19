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

export const getMovies = (skip: number, take: number) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .get(`${endpoints.getMovies((skip - 1) * 12, take)}`)
    .then((res: any) => {
      dispatch(setMovies(res.data.movies));
      dispatch(setTotal(res.data.total));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Movies were fetched successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Movies were not fetched!`,
        }),
      );
      throw err;
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
