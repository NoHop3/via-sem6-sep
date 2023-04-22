import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../models/movie";

export interface MovieStore {
  movie: Movie;
  isLoading: boolean;
}

const initialState: MovieStore = {
  movie: {
    id: 0,
    title: "",
    year: 0,
  },
  isLoading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie(state, action: PayloadAction<Movie>) {
      console.log(action.payload);
      state.movie = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { setMovie, setIsLoading } = movieSlice.actions;
