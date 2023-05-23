/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import {
  setIsSearching,
  setTotalResults,
  setSearchResults,
} from "../shared/store/search-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";

// #region search
export const search = (searchPhrase: string) => (dispatch: any) => {
  dispatch(setIsSearching(true));
  axios
    .get(`${endpoints.search(searchPhrase)}`)
    .then((res: any) => {
      dispatch(setTotalResults(res.data.totalResults));
      dispatch(setSearchResults(res.data.Search));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `Search results for "${searchPhrase}" were fetched successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `Search results for "${searchPhrase}" were not fetched!`,
        }),
      );
      throw err;
    })
    .finally(() => {
      dispatch(setIsSearching(false));
    });
};
// #endregion
