/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsSearching,
  setTotalResults,
  setSearchResults,
} from "../shared/store/search-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";
import { SearchResultItem } from "../shared/utils/typescript/types";

// #region search
export const search =
  (searchPhrase: string, skip: number, take: number) =>
  async (dispatch: any) => {
    dispatch(setIsSearching(true));
    try {
      await Promise.all([
        axios
          .get(`${endpoints.search(searchPhrase, skip, take)}`)
          .then(async (x: any) => {
            dispatch(setTotalResults(x.data.total));

            await Promise.all(
              x.data.result.map(async (item: SearchResultItem) => {
                item.Type === "Movie"
                  ? (item.Poster = await getMoviePosterFor(item.Id))
                  : (item.Poster =
                      "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png");

                return item;
              }),
            ).then((x) => {
              dispatch(setSearchResults(x));
              dispatch(
                setNotification({
                  open: true,
                  type: "success",
                  message: `Search results for "${searchPhrase}" were fetched successfully!`,
                }),
              );
            });
          }),
      ]);
    } catch (err) {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Search results for "${searchPhrase}" were not fetched!`,
        }),
      );
      console.error(err);
    } finally {
      dispatch(setIsSearching(false));
    }
  };
// #endregion

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
