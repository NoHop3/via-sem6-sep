import axios from "axios";
import { setUser, setIsLoggedIn } from "../shared/store/user-store";
import { setNotification } from "../shared/store/notification-store";
import { endpoints } from "./endpoints";
import { RegisteredUser, User } from "../shared/models/user";

// #region signIn
export const signIn =
  (username: string, password: string) => (dispatch: any) => {
    axios
      .post(`${endpoints.signIn(username, password)}`)
      .then((res: any) => {
        dispatch(setUser(res.data as User));
        dispatch(
          setNotification({
            open: true,
            type: "success",
            message: `User was signed in successfully!`,
          }),
        );
      })
      .catch((err: any) => {
        dispatch(
          setNotification({
            open: true,
            type: "error",
            message: `User was not signed in!`,
          }),
        );
        console.error(err);
      })
      .finally(() => {
        dispatch(setIsLoggedIn(true));
      });
  };
// #endregion

// #region signUp
export const signUp = (user: RegisteredUser) => (dispatch: any) => {
  axios
    .post(`${endpoints.signUp(user)}`)
    .then((res: any) => {
      dispatch(setUser(res.data as User));
      dispatch(
        setNotification({
          open: true,
          type: "success",
          message: `User was signed up successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: "error",
          message: `User was not signed up!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoggedIn(true));
    });
};
// #endregion
