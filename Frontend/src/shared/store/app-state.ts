import { type RouterState } from "connected-react-router";
import { type MovieStore } from "./movie-store";
import { type NotificationStore } from "./notification-store";

export interface ApplicationState {
  router: RouterState;
  movies: MovieStore;
  notifications: NotificationStore;
}
