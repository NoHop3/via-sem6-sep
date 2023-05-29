import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserReview } from "../models/movie";
import { ResultItem } from "../utils/typescript/types";

export interface MovieStore {
  movies: Movie[];
  filteredMovies: Movie[];
  highestRated: ResultItem[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  userReview: UserReview;
  reviews?: UserReview[];
  filterByName?: boolean;
  filterByYear?: boolean;
  filterByFavorite: boolean;
  isReviewDialogOpen: boolean;
  currentlyReviewingMovieId?: number;
}

const initialState: MovieStore = {
  movies: [] as Movie[],
  filteredMovies: [] as Movie[],
  highestRated: [] as ResultItem[],
  movie: {
    id: 0,
    title: "",
    year: 0,
    details: {},
  } satisfies Movie,
  isLoading: false,
  page: 1,
  total: 0,
  filterByFavorite: false,
  isReviewDialogOpen: false,
  userReview: {
    id: 0,
    movieId: 0,
    username: "",
    userId: 0,
    reviewText: "",
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
      state.filteredMovies = [...state.movies];
      if (state.filterByYear ?? state.filterByName ?? state.filterByFavorite) {
        if (state.filterByYear) {
          state.filteredMovies = state.filteredMovies.sort((a, b) =>
            a.year > b.year ? 1 : -1,
          );
        }
        if (state.filterByName) {
          state.filteredMovies = state.filteredMovies.sort((a, b) =>
            a.title.localeCompare(b.title),
          );
        }
        if (state.filterByFavorite) {
          state.filteredMovies = state.filteredMovies.filter(
            (movie) => movie.isFavorite,
          );
        }
      }
    },
    setMovie(state, action: PayloadAction<Movie>) {
      state.movie = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setFilterByName(state) {
      state.filterByName = !state.filterByName ?? true;
      state.filteredMovies = [...state.movies];
      state.filterByName
        ? (state.filteredMovies = state.filteredMovies.sort((a, b) =>
            a.title.localeCompare(b.title),
          ))
        : (state.filteredMovies = state.filteredMovies.sort((a, b) =>
            b.title.localeCompare(a.title),
          ));
    },
    setUserReview(state, action: PayloadAction<UserReview>) {
      state.userReview = action.payload;
    },
    clearUserReview(state) {
      state.userReview = {
        id: 0,
        movieId: 0,
        username: "",
        userId: 0,
        reviewText: "",
      };
    },
    setFilterByYear(state) {
      state.filterByYear = !state.filterByYear ?? true;
      state.filteredMovies = [...state.movies];
      state.filterByYear
        ? (state.filteredMovies = state.filteredMovies.sort((a, b) =>
            a.year > b.year ? 1 : -1,
          ))
        : (state.filteredMovies = state.filteredMovies.sort((a, b) =>
            b.year > a.year ? 1 : -1,
          ));
    },
    setFilterByFavorite(state) {
      state.filterByFavorite = !state.filterByFavorite;
      if (state.filterByFavorite) {
        state.filteredMovies = state.movies.filter((movie) => movie.isFavorite);
      } else {
        state.filteredMovies = [
          ...state.filteredMovies.filter(
            (movie) => movie.isFavorite && !movie.isFavorite,
          ),
        ];
      }
    },
    clearFilters(state) {
      state.filteredMovies = [];
      state.filterByName = undefined;
      state.filterByYear = undefined;
      state.filterByFavorite = false;
    },
    setFavouriteForMovie(state, action: PayloadAction<number>) {
      const movie = state.movies.find((m) => m.id === action.payload);
      if (movie) {
        movie.isFavorite = !movie.isFavorite;
      }
    },
    setIsReviewDialogOpen(state, action: PayloadAction<boolean>) {
      state.isReviewDialogOpen = action.payload;
    },
    setCurrentlyReviewingMovieId(state, action: PayloadAction<number>) {
      state.currentlyReviewingMovieId = action.payload;
    },
    setHighestRated(state, action: PayloadAction<ResultItem[]>) {
      state.highestRated = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  setMovie,
  setIsLoading,
  setMovies,
  setPage,
  setTotal,
  clearFilters,
  setFilterByName,
  setFilterByYear,
  setFilterByFavorite,
  setUserReview,
  clearUserReview,
  setFavouriteForMovie,
  setIsReviewDialogOpen,
  setCurrentlyReviewingMovieId,
  setHighestRated,
} = movieSlice.actions;
