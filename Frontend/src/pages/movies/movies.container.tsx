import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { MovieCard } from "../../components";
import { StyledCircularProgress, StyledPagination } from "../../styles";
import {
  StyledFilterWrapper,
  StyledMoviePageWrapper,
  StyledMovieGrid,
  StyledMovieCardWrapper,
} from "./movies.styles";
import { type MovieProps } from "./movies.props";
import { IconButton, useTheme } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import PinIcon from "@mui/icons-material/Pin";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export const _Movies = (props: MovieProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoading,
    movies,
    filteredMovies,
    page,
    total,
    getMovies,
    getMovieDetailsFor,
    setPage,
    setFilterByName,
    setFilterByYear,
    clearFilters,
    setNotification,
  } = props;
  const queryStrings = queryString.parse(useLocation().search);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    navigate(`/movies?page=${value}`);
  };

  useEffect(() => {
    navigate(`/movies?page=${page}`);
    queryString.parse(location.search);
    setPage(Number(queryStrings.page) || page);
    getMovies(Number(queryStrings.page) || page, 12);
  }, [location.search, setPage, queryStrings.page, getMovies, navigate, page]);

  const handleMovieCardClick = (id: number) => {
    navigate(`/movies/${id}`);
    getMovieDetailsFor(id);
  };

  return (
    <StyledMoviePageWrapper>
      {!isLoading ? (
        <>
          <StyledFilterWrapper>
            <IconButton
              size="large"
              aria-label="sort by name button"
              edge="end"
              onClick={() => {
                setFilterByName();
                setNotification({
                  open: true,
                  message: "Sorted by name. Click again to switch order",
                  type: "success",
                });
              }}
              color={"inherit"}
              sx={{ mr: 2, p: 2 }}
            >
              <AbcIcon
                style={{
                  fontSize: theme.spacing(3),
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              aria-label="sort by year button"
              edge="end"
              onClick={() => {
                setFilterByYear();
                setNotification({
                  open: true,
                  message: "Sorted by year. Click again to switch order",
                  type: "success",
                });
              }}
              color={"inherit"}
              sx={{ mr: 2, p: 2 }}
            >
              <PinIcon
                style={{
                  fontSize: theme.spacing(3),
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>

            <StyledPagination
              count={Math.ceil(total / 12)}
              page={page}
              defaultPage={1}
              onChange={handlePageChange}
              size="large"
            />

            <IconButton
              size="large"
              aria-label="clear filtering button"
              edge="end"
              onClick={() => {
                clearFilters();
                setNotification({
                  open: true,
                  message: "Filters cleared",
                  type: "success",
                });
              }}
              color={"inherit"}
              sx={{ mr: 2, p: 2 }}
            >
              <FilterAltOffIcon
                style={{
                  fontSize: theme.spacing(3),
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>
          </StyledFilterWrapper>

          <StyledMovieGrid container>
            {filteredMovies.length > 0
              ? filteredMovies.map((movie) => (
                  <StyledMovieCardWrapper key={movie.id}>
                    <MovieCard {...movie} onMovieClick={handleMovieCardClick} />
                  </StyledMovieCardWrapper>
                ))
              : movies.map((movie) => (
                  <StyledMovieCardWrapper key={movie.id}>
                    <MovieCard {...movie} onMovieClick={handleMovieCardClick} />
                  </StyledMovieCardWrapper>
                ))}
          </StyledMovieGrid>

          <StyledPagination
            count={Math.ceil(total / 12)}
            page={page}
            defaultPage={1}
            onChange={handlePageChange}
            size="large"
          />
        </>
      ) : (
        <StyledCircularProgress disableShrink size={"6rem"} />
      )}
    </StyledMoviePageWrapper>
  );
};
