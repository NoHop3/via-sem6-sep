import axios from "axios";
import { setIsLoading, setMovie } from "../shared/store/movie-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";

export const getMovieWith = (id: number) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .get(`${endpoints.getMovieWith(id)}`)
    .then((res: any) => {
      // eslint-disable-next-line
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
