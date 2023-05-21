import React from "react";
import { createTheme } from "@mui/material/styles";

export const useCustomTheme = () => {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#880000",
            dark: "#121212",
            light: "#fffefc",
            contrastText: "#ffcc00",
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
        },
        components: {},
        breakpoints: {
          values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        },
        spacing: 8,
        typography: {
          fontFamily: "Roboto",
          fontSize: 16,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
      }),
    [],
  );

  return theme;
};
