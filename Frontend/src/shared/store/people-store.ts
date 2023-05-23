import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, PersonMovie } from "../models/person";

export interface PeopleStore {
  people: Person[];
  isLoading: boolean;
  page: number;
  total: number;
}

const initialState: PeopleStore = {
  people: [],
  isLoading: false,
  page: 1,
  total: 0,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload;
    },
    setPersonMovies(state, action: PayloadAction<PersonMovie[]>) {
      const person = state.people.find(
        (person) => person.id === action.payload[0].personId,
      );
      if (person) {
        person.movies = action.payload;
      }
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

export default peopleSlice.reducer;
export const { setIsLoading, setPeople, setPage, setTotal, setPersonMovies } =
  peopleSlice.actions;
