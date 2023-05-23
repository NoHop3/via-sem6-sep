import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SearchResultItem } from "../utils/typescript/types";

export interface SearchStore {
  searchPhrase: string;
  totalResults: number;
  searchResults: SearchResultItem[];
}

const initialState: SearchStore = {
  searchPhrase: "",
  totalResults: 0,
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchStore(state, action: PayloadAction<SearchStore>) {
      state = action.payload;
    },
    setSearchPhrase(state, action: PayloadAction<string>) {
      state.searchPhrase = action.payload;
    },
    setTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setSearchResults(state, action: PayloadAction<SearchResultItem[]>) {
      state.searchResults = action.payload;
    },
    reset(state, action: PayloadAction<SearchStore>) {
      state = initialState;
    },
  },
});

export default searchSlice.reducer;
export const {
  setSearchStore,
  setSearchPhrase,
  setSearchResults,
  setTotalResults,
  reset,
} = searchSlice.actions;
