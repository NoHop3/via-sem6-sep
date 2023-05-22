import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../models/theme";

export interface ThemeStore {
  theme: Theme;
}

const initialState: ThemeStore = {
  theme: {
    mode: "light",
    primary: {
      main: "#880000",
      dark: "#121212",
      light: "#fffefc",
      contrastText: "#ffcc00",
    },
    text: {
      primary: "#121212",
      secondary: "#880000",
      disabled: "#000000",
    },
    background: "#fffefc",
    divider: "#00000026",
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
    setPrimaryTheme(state, action: PayloadAction<Theme["primary"]>) {
      state.theme.primary = action.payload;
    },
    setPrimaryThemeMain(state, action: PayloadAction<string>) {
      state.theme.primary.main = action.payload;
    },
    setPrimaryThemeDark(state, action: PayloadAction<string>) {
      state.theme.primary.dark = action.payload;
    },
    setPrimaryThemeLight(state, action: PayloadAction<string>) {
      state.theme.primary.light = action.payload;
    },
    setPrimaryThemeContrastText(state, action: PayloadAction<string>) {
      state.theme.primary.contrastText = action.payload;
    },
    setTextTheme(state, action: PayloadAction<Theme["text"]>) {
      state.theme.text = action.payload;
    },
    setTextThemePrimary(state, action: PayloadAction<string>) {
      state.theme.text.primary = action.payload;
    },
    setTextThemeSecondary(state, action: PayloadAction<string>) {
      state.theme.text.secondary = action.payload;
    },
    setTextThemeDisabled(state, action: PayloadAction<string>) {
      state.theme.text.disabled = action.payload;
    },
    setBackgroundColor(state, action: PayloadAction<string>) {
      state.theme.background = action.payload;
    },
    setThemeDivider(state, action: PayloadAction<string>) {
      state.theme.divider = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {
  setTheme,
  setThemeMode,
  setPrimaryThemeMain,
  setPrimaryThemeDark,
  setPrimaryThemeLight,
  setBackgroundColor,
  setPrimaryThemeContrastText,
} = themeSlice.actions;
