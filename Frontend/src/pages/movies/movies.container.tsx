import { useEffect, useMemo, useState } from "react";
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
import { _Dialog as ReviewDialog } from "../../components/shared/dialog/dialog.container";

export const _Movies = (props: MovieProps) => {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    movies,
    userReview,
    userId,
    isLoading,
    filteredMovies,
    page,
    total,
    getMovies,
    getMovieDetailsFor,
    setPage,
    setUserReview,
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
    getMovies(Number(queryStrings.page) || page, 12);
  }, [location.search, setPage, queryStrings.page, getMovies, navigate, page]);

  const movieCards = useMemo(() => {
    const moviesToRender = filteredMovies.length > 0 ? filteredMovies : movies;
    const handleMovieCardClick = (id: number) => {
      navigate(`/movies/${id}`);
      getMovieDetailsFor(id);
    };
    return moviesToRender.map((movie) => (
      <StyledMovieCardWrapper key={movie.id}>
        <MovieCard
          userId={userId}
          onMovieClick={handleMovieCardClick}
          onAddToFavoritesClick={setFavorite}
          isFavorite={movie.isFavorite}
          getUserReview={getUserReview}
          {...movie}
        />
        {!!userReview && !!userId && (
          <ReviewDialog
            open={openReviewDialog}
            onClose={() => {
              setOpenReviewDialog(false);
            }}
            title={"Leave a review for this movie"}
            children={
              <textarea
                value={userReview.reviewText}
                onChange={(e) => {
                  console.log(e.target.value, userReview.reviewText);
                }}
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
            }
            options={["Save", "Close"]}
            onOptionClick={(option) => {
              if (option === "Save") {
                setUserReview(userId, movie.id, userReview);
                setOpenReviewDialog(false);
              } else {
                setOpenReviewDialog(false);
              }
            }}
          />
        )}
      </StyledMovieCardWrapper>
    ));
  }, [
    getUserReview,
    filteredMovies,
    movies,
    userId,
    setFavorite,
    getMovieDetailsFor,
    navigate,
    userReview,
    setUserReview,
    openReviewDialog,
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
