import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../models/theme";

export interface ThemeStore {
  theme: Theme;
}

const initialState: ThemeStore = {
  theme: {
    mode: "light",
    main: "#880000",
    dark: "#121212",
    light: "#fffefc",
    contrastText: "#ffcc00",
    background: "#fffefc",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.theme.mode = action.payload;
    },
    setThemeColorMain(state, action: PayloadAction<string>) {
      state.theme.main = action.payload;
    },
    setThemeColorDark(state, action: PayloadAction<string>) {
      state.theme.dark = action.payload;
    },
    setThemeColorLight(state, action: PayloadAction<string>) {
      state.theme.light = action.payload;
    },
    setThemeColorBackground(state, action: PayloadAction<string>) {
      state.theme.background = action.payload;
    },
    setThemeContrastText(state, action: PayloadAction<string>) {
      state.theme.contrastText = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {
  setTheme,
  setThemeMode,
  setThemeColorMain,
  setThemeColorDark,
  setThemeColorLight,
  setThemeColorBackground,
  setThemeContrastText,
} = themeSlice.actions;
