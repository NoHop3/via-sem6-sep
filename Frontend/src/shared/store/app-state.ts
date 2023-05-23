import { type RouterState } from "connected-react-router";
import { type MovieStore } from "./movie-store";
import { type NotificationStore } from "./notification-store";
import { ThemeStore } from "./theme-store";
import { PeopleStore } from "./people-store";

export interface ApplicationState {
  router: RouterState;
  movies: MovieStore;
  people: PeopleStore;
  notifications: NotificationStore;
  theme: ThemeStore;
}
