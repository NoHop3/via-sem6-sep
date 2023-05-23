import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { _Movies } from "./movies.container";
import { services } from "../../services";
import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";
import { setPage } from "../../shared/store/movie-store";

const mapStateToProps = (state: ApplicationState) => ({
  movies: state.movies.movies,
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
  page: state.movies.page,
  total: state.movies.total,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      setPage,
      getMovieDetailsFor: services.getMovieDetailsFor,
      getMovies: services.getMovies,
    },
    dispatch,
  );
};

export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies);
