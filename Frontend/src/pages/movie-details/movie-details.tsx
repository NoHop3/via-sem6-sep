import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { _MovieDetails } from "./movie-details.container";
import { services } from "../../services";
import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";

const mapStateToProps = (state: ApplicationState) => ({
  movie: state.movies.movie,
  isLoading: state.movies.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      getMovieDetailsFor: services.getMovieDetailsFor,
    },
    dispatch,
  );
};

export const MovieDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_MovieDetails);
