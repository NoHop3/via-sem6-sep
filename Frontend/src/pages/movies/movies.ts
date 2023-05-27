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
  setFilterByFavorite,
  setIsReviewDialogOpen,
  setCurrentlyReviewingMovieId,
  clearUserReview,
} from "../../shared/store/movie-store";
import { setNotification } from "../../shared/store/notification-store";

const mapStateToProps = (state: ApplicationState) => ({
  userId: state.user.id,
  username: state.user.username,
  movies: state.movies.movies,
  filteredMovies: state.movies.filteredMovies,
  isLoading: state.movies.isLoading,
  movie: state.movies.movie,
  page: state.movies.page,
  total: state.movies.total,
  userReview: state.movies.userReview,
  isReviewDialogOpen: state.movies.isReviewDialogOpen,
  currentlyReviewingMovieId: state.movies.currentlyReviewingMovieId,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      setPage,
      setFilterByName,
      setFilterByYear,
      setFilterByFavorite,
      clearFilters,
      setNotification,
      setIsReviewDialogOpen,
      setCurrentlyReviewingMovieId,
      clearUserReview,
      getMovieReviews: services.getMovieReviews,
      setUserReview: services.setUserReview,
      getUserReview: services.getUserReview,
      setFavorite: services.setFavorite,
      getMovieDetailsFor: services.getMovieDetailsFor,
      getMovies: services.getMovies,
    },
    dispatch,
  );
};

export const Movies = connect(mapStateToProps, mapDispatchToProps)(_Movies);
