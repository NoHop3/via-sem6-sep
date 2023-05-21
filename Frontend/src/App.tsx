import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { useCustomTheme } from "./shared/utils/hooks/useCustomTheme";
import { Home, Error, Movies, MovieDetails } from "./pages";
import { Header, BottomNavigation, Snackbar } from "./components";
import { useGetDeviceType } from "./shared/utils/hooks/useGetDeviceType";
import { DeviceTypes } from "./shared/utils/enums/deviceTypes";
import {
  useAppDispatch,
  useAppSelector,
} from "./shared/utils/typescript/reduxTypes";
import { setNotificationVisibility } from "./shared/store/notification-store";

function App() {
  const notification = useAppSelector(
    (state) => state.notifications.notification,
  );
  const theme = useCustomTheme();
  const dispatch = useAppDispatch();
  return (
    <ThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Header children={<></>} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Snackbar
              open={notification.open}
              message={notification.message}
              type={notification.type}
              onClose={() => dispatch(setNotificationVisibility(false))}
              autoHideDuration={4000}
            />
            {useGetDeviceType() !== DeviceTypes.DESKTOP && <BottomNavigation />}
          </div>
          ;
        </BrowserRouter>
      </ScThemeProvider>
    </ThemeProvider>
  );
}

export default App;
