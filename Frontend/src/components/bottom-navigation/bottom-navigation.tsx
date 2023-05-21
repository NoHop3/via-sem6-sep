import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { useTheme } from "@mui/material/styles";

export const _BottomNavigation = () => {
  const [value, setValue] = React.useState("recents");
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      style={{ backgroundColor: theme.palette.primary.dark }}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        style={{ color: theme.palette.primary.light }}
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon style={{ color: theme.palette.primary.light }} />}
      />
      <BottomNavigationAction
        style={{ color: theme.palette.primary.light }}
        color={"#fafafa"}
        label="Home"
        value="home"
        icon={<HomeIcon style={{ color: theme.palette.primary.light }} />}
      />
      <BottomNavigationAction
        style={{ color: theme.palette.primary.light }}
        label="Theme"
        value="theme"
        icon={<BedtimeIcon style={{ color: theme.palette.primary.light }} />}
      />
      {/* <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      /> */}
    </BottomNavigation>
  );
};
