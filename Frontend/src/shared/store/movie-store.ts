import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../models/movie";

export interface MovieStore {
  movies: Movie[];
  filteredMovies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  filterByName?: boolean;
  filterByYear?: boolean;
  filterByFavorite: boolean;
}

const initialState: MovieStore = {
  movies: [] as Movie[],
  filteredMovies: [] as Movie[],
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
      const preservedFilteredMovies = [...state.filteredMovies] ?? [
        ...state.movies,
      ];
      if (state.filterByFavorite) {
        state.filteredMovies = state.movies.filter((movie) => movie.isFavorite);
      } else {
        state.filteredMovies = preservedFilteredMovies;
      }
    },
    clearFilters(state) {
      state.filteredMovies = [];
      state.filterByName = undefined;
      state.filterByYear = undefined;
      state.filterByFavorite = false;
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
} = movieSlice.actions;
