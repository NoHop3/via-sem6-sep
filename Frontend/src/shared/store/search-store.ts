import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ResultItem } from "../utils/typescript/types";

export interface SearchStore {
  isSearching: boolean;
  searchPhrase: string;
  totalResults: number;
  searchResults: ResultItem[];
}

const initialState: SearchStore = {
  isSearching: false,
  searchPhrase: "",
  totalResults: 0,
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    setSearchStore(state, action: PayloadAction<SearchStore>) {
      state = action.payload;
    },
    setSearchPhrase(state, action: PayloadAction<string>) {
      state.searchPhrase = action.payload;
    },
    setTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setSearchResults(state, action: PayloadAction<ResultItem[]>) {
      state.searchResults = action.payload;
    },
    reset(state, action: PayloadAction<SearchStore>) {
      state = initialState;
    },
  },
});

export default searchSlice.reducer;
export const {
  setIsSearching,
  setSearchStore,
  setSearchPhrase,
  setSearchResults,
  setTotalResults,
  reset,
} = searchSlice.actions;
