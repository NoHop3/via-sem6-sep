/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsLoading,
  setPeople,
  setPersonMovies,
  setTotal,
} from "../shared/store/people-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";

// #region getPeople
export const getPeople =
  (skip: number, take: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axios.get(
        `${endpoints.getPeople((skip - 1) * 12, take)}`,
      );

      // before setPeople dispatch action for each person take their movies with getPersonMovies(id)
      await Promise.all(
        res.data.people.map((person: any) =>
          dispatch(getPersonMovies(person.id)),
        ),
      );

      dispatch(setPeople(res.data.people));
      dispatch(setTotal(res.data.total));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `People were fetched successfully!`,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `People were not fetched!`,
        }),
      );
      throw err;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

const getPersonMovies = (id: number) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${endpoints.getPersonMovies(id)}`);
    dispatch(setPersonMovies(res.data));
  } catch (err) {
    console.error(err);
    dispatch(setPersonMovies([]));
  }
};
// #endregion

// #region setFavorite
export const setFavorite = (id: number) => async (dispatch: any) => {
  try {
    const res = await axios.put(`${endpoints.setFavorite(id)}`);
    if (res.data) {
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Person was favorited successfully!`,
        }),
      );
    }
  } catch (err) {
    dispatch(
      setNotification({
        open: true,
        type: "error",
        message: `Person was not favorited!`,
      }),
    );
    throw err;
  }
};
// #endregion
