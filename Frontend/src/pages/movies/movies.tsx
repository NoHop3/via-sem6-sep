import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { _Movies } from "./movies.container";
import { services } from "../../services";
import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      getMovieWith: services.getMovieWith,
    },
    dispatch,
  );
};

export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies);
