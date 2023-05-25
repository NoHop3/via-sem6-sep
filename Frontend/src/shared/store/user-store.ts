import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";

export interface UserStore {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  year?: number;
  isLoggedIn: boolean;
}

const initialState: UserStore = {
  id: 0,
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.year = action.payload.year;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    reset(state, action: PayloadAction<UserStore>) {
      state = initialState;
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setUsername,
  setToken,
  setIsLoggedIn,
  reset,
} = userSlice.actions;
