import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, type History } from "history";
import movieReducer from "./movie-store";
import notificationReducer from "./notification-store";
import themeReducer from "./theme-store";
import personReducer from "./people-store";
import searchReducer from "./search-store";
import userReducer from "./user-store";

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    movies: movieReducer,
    people: personReducer,
    notifications: notificationReducer,
    theme: themeReducer,
    search: searchReducer,
    user: userReducer,
  });

export let store: ReturnType<typeof configureAppStore>;

export const configureAppStore = () => {
  const _store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(
        routerMiddleware(history),
      );
    },
  });
  store = _store;
  return _store;
};
