import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { _Movies } from "./movies.container";
import { services } from "../../services";
import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";
import {
  setPage,
  clearFilters,
  setFilterByName,
  setFilterByYear,
} from "../../shared/store/movie-store";
import { setNotification } from "../../shared/store/notification-store";

const mapStateToProps = (state: ApplicationState) => ({
  userId: state.user.id,
  movies: state.movies.movies,
  filteredMovies: state.movies.filteredMovies,
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
  page: state.movies.page,
  total: state.movies.total,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      setPage,
      setFilterByName,
      setFilterByYear,
      clearFilters,
      setNotification,
      setRating: services.setUserRating,
      setFavorite: services.setFavorite,
      getMovieDetailsFor: services.getMovieDetailsFor,
      getMovies: services.getMovies,
    },
    dispatch,
  );
};

export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies);
