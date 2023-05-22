import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      dark: "#004ba0",
      light: "#4791db",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
    background: {
      default: "#fffefc",
    },
    text: {
      primary: "#121212",
      secondary: "#880000",
      disabled: "#000000",
    },
    divider: "#00000026",
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: "dark",
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#880000",
      disabled: "#000000",
    },
  },
});
