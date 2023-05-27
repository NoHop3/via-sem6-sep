// eslint-disable @typescript-eslint/no-unnecessary-type-assertion
import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Logo, StyledLink } from "./header.styles";
import { type NavItem } from "../../shared/utils/typescript/types";
import { useNavigate } from "react-router-dom";
import {
  InputBase,
  useScrollTrigger,
  Slide,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeIcon from "@mui/icons-material/Brightness6";
import { HeaderProps } from "./header.props";
import { ThemeDialog } from "../theme-dialog/theme-dialog";
import { _Dialog as SearchDialog } from "../shared/dialog/dialog.container";
import { _Backdrop as Backdrop } from "../shared/backdrop/backdrop";
import { Card as SearchResultItem } from "../shared/card/card.container";
import { StyledTypography } from "../../styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "all",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function HideOnScroll(props: HeaderProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window != null ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <></>}
    </Slide>
  );
}

const drawerWidth = 240;
const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "People", path: "/people" },
  { name: "Sign In", path: "/sign-in" },
];

export const _Header = (props: HeaderProps) => {
  const [openThemeDialog, setOpenThemeDialog] = React.useState(false);
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const TAKE_AMOUNT = 20;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClick = (path: string) => {
    navigate(path);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SEP6
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                handleDrawerClick(item.path);
              }}
            >
              <ListItemText primary={item.name}>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* eslint-disable-next-line */}
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Logo src="/images/stgdev__logo__dark.png" />
            </Box>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.name}>
                  <StyledLink to={item.path}>{item.name}</StyledLink>
                </Button>
              ))}
            </Box>
            <Search sx={{ width: 250 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as
                      | HTMLInputElement
                      | HTMLTextAreaElement;
                    props.onSearch?.(target.value, 0, TAKE_AMOUNT);
                    setOpenSearchDialog(true);
                  }
                }}
                onChange={(e) => {
                  props.onSearchPhraseChange?.(e.target.value);
                }}
              />
            </Search>
            <Divider />
            <IconButton
              size="large"
              aria-label="theming button"
              edge="end"
              onClick={() => {
                setOpenThemeDialog(true);
              }}
              color={"inherit"}
              sx={{ ml: 2, pt: 2, display: { xs: "none", lg: "block" } }}
            >
              <ThemeIcon />
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ThemeDialog
        open={openThemeDialog}
        onClose={() => {
          setOpenThemeDialog(false);
        }}
      />
      {props.isSearching ? (
        <Backdrop />
      ) : (
        <SearchDialog
          open={openSearchDialog}
          onClose={() => {
            setOpenSearchDialog(false);
          }}
          title={
            props.isSearching
              ? "Searching..."
              : `Total ${props.totalResults ?? 0} results for ${
                  props.searchPhrase ?? ""
                }, currently showing ${TAKE_AMOUNT}`
          }
          children={
            props.searchResults && props.searchResults?.length > 0 ? (
              props.searchResults?.map((result, i) => (
                <SearchResultItem
                  id={result.id}
                  key={i}
                  date={String(result.year) ?? "N/A"}
                  title={result.name}
                  description={result.type}
                  imgSource={result.poster}
                />
              ))
            ) : (
              <StyledTypography>Nothing found.</StyledTypography>
            )
          }
          options={["Save", "Close"]}
          onOptionClick={(option) => {
            switch (option) {
              case "Save":
                alert("Save");
                break;
              case "Close":
                setOpenSearchDialog(false);
                break;
            }
          }}
        />
      )}
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ m: 4, p: 1 }}></Box>
    </Box>
  );
};
