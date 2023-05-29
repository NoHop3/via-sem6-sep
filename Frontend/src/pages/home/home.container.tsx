import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";
import { services } from "../../services";
import { _Home } from "./home";

const mapStateToProps = (state: ApplicationState) => ({
  items: state.movies.highestRated,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      getHighestRated: services.getHighestRated,
      getMovieDetailsFor: services.getMovieDetailsFor,
    },
    dispatch,
  );
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
