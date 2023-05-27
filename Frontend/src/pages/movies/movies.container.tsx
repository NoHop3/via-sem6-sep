import { useEffect, useMemo } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export const _Movies = (props: MovieProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    movies,
    userId,
    isLoading,
    filteredMovies,
    page,
    total,
    setUserReview,
    getMovies,
    getMovieDetailsFor,
    setPage,
    setFavorite,
    getUserReview,
    setFilterByName,
    setFilterByYear,
    setFilterByFavorite,
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
    getMovies(Number(queryStrings.page) || page, 12, userId);
  }, [
    location.search,
    setPage,
    queryStrings.page,
    getMovies,
    navigate,
    page,
    userId,
  ]);

  const movieCards = useMemo(() => {
    const moviesToRender = filteredMovies.length > 0 ? filteredMovies : movies;
    const handleMovieCardClick = (id: number) => {
      navigate(`/movies/${id}`);
      getMovieDetailsFor(id);
    };
    return moviesToRender.map((movie) => (
      <StyledMovieCardWrapper key={movie.id}>
        <MovieCard
          {...movie}
          onMovieClick={handleMovieCardClick}
          onAddToFavoritesClick={setFavorite}
          isFavorite={movie.isFavorite}
          showFavorite={!!userId}
          getUserReview={getUserReview}
          setUserReview={setUserReview}
          userId={userId}
        />
      </StyledMovieCardWrapper>
    ));
  }, [
    setUserReview,
    getUserReview,
    filteredMovies,
    movies,
    userId,
    setFavorite,
    getMovieDetailsFor,
    navigate,
  ]);

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
            {!!userId && (
              <IconButton
                size="large"
                aria-label="sort by favorite button"
                edge="end"
                onClick={() => {
                  setFilterByFavorite();
                  setNotification({
                    open: true,
                    message: "Showing favorite movies. Click again to disable",
                    type: "success",
                  });
                }}
                color={"inherit"}
                sx={{ mr: 2, p: 2 }}
              >
                <FavoriteIcon
                  style={{
                    fontSize: theme.spacing(3),
                    color: theme.palette.text.primary,
                  }}
                />
              </IconButton>
            )}

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

          <StyledMovieGrid container>{movieCards}</StyledMovieGrid>

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
