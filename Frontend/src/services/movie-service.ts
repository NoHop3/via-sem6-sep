import axios from "axios";
import { setIsLoading, setMovie } from "../shared/store/movie-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";

export const getMovieWith = (id: number) => (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    axios
      .get(`${endpoints.getMovieWith(id)}`)
      .then((res) => {
        // eslint-disable-next-line
        dispatch(setMovie(res.data));
      })
      .catch((err) => {
        setNotification({
          open: true,
          type: "error",
          message: `Movie with id ${id} was not fetched!`,
        });
        console.error(err);
      });
    dispatch(
      setNotification({
        open: true,
        type: "success",
        message: `Movie with id ${id} was fetched successfully!`,
      }),
    );
  } catch (error: any) {
    console.error(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
