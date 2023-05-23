/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsLoading,
  setPeople,
  setTotal,
} from "../shared/store/people-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";
import { PersonMovie } from "../shared/models/person";

// #region getPeople
export const getPeople =
  (skip: number, take: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axios.get(
        `${endpoints.getPeople((skip - 1) * 18, take)}`,
      );
      dispatch(setTotal(res.data.count));

      // before setPeople dispatch action for each person take their movies with getPersonMovies(id)
      const peopleWithMovies = await Promise.all(
        res.data.people.map(async (person: any) => {
          const movies = await getPersonMovies(person.id);
          return { ...person, movies };
        }),
      );

      dispatch(setPeople(peopleWithMovies));
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

const getPersonMovies = async (id: number): Promise<PersonMovie[]> => {
  try {
    const res = await axios.get(`${endpoints.getPersonMovies(id)}`);
    return res.data;
  } catch (err) {
    return [];
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
