import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../models/movie";

export interface MovieStore {
  movies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
}

const initialState: MovieStore = {
  movies: [],
  movie: {
    id: 0,
    title: "",
    year: 0,
    details: {},
  },
  isLoading: false,
  page: 1,
  total: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    setMovie(state, action: PayloadAction<Movie>) {
      console.log(action.payload);
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
  },
});

export default movieSlice.reducer;
export const { setMovie, setIsLoading, setMovies, setPage, setTotal } =
  movieSlice.actions;
