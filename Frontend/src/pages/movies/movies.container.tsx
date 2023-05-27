import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { MovieCard } from "../../components";
import {
  StyledCircularProgress,
  StyledPagination,
  StyledTypography,
} from "../../styles";
import {
  StyledFilterWrapper,
  StyledMoviePageWrapper,
  StyledMovieGrid,
  StyledMovieCardWrapper,
} from "./movies.styles";
import { type MovieProps } from "./movies.props";
import { Divider, IconButton, useTheme } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import PinIcon from "@mui/icons-material/Pin";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Backdrop from "@mui/material/Backdrop";
import { _Dialog as ReviewDialog } from "../../components/shared/dialog/dialog.container";
import { UserReview } from "../../shared/models/movie";

export const _Movies = (props: MovieProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userReview,
    movies,
    userId,
    username,
    isLoading,
    filteredMovies,
    page,
    total,
    isReviewDialogOpen,
    currentlyReviewingMovieId,
    setUserReview,
    getMovies,
    getMovieDetailsFor,
    setPage,
    clearUserReview,
    setIsReviewDialogOpen,
    setCurrentlyReviewingMovieId,
    setFavorite,
    getUserReview,
    setFilterByName,
    setFilterByYear,
    setFilterByFavorite,
    clearFilters,
    setNotification,
  } = props;
  const queryStrings = queryString.parse(useLocation().search);
  const [tempReview, setTempReview] = useState<UserReview>(
    userReview as UserReview,
  );

  const handleUserReviewChange = useCallback(() => {
    setTempReview(userReview as UserReview);
  }, [userReview]);

  useEffect(() => {
    handleUserReviewChange();
  }, [handleUserReviewChange]);

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
          setIsReviewDialogOpen={setIsReviewDialogOpen}
          setCurrentlyReviewingMovieId={setCurrentlyReviewingMovieId}
        />
      </StyledMovieCardWrapper>
    ));
  }, [
    setUserReview,
    getUserReview,
    setIsReviewDialogOpen,
    setCurrentlyReviewingMovieId,
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
      {!!userId && (
        <Backdrop
          open={isReviewDialogOpen}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <ReviewDialog
            style={{ zIndex: 1000, color: theme.palette.text.primary }}
            open={isReviewDialogOpen}
            onClose={() => {
              setIsReviewDialogOpen(false);
            }}
            title={"Leave a review for this movie"}
            children={
              <>
                <StyledTypography>
                  Here you can leave a review. You are logged in as {username}
                </StyledTypography>
                <Divider />
                <textarea
                  defaultValue={userReview.reviewText}
                  value={tempReview.reviewText}
                  onChange={(e) => {
                    setTempReview({
                      ...tempReview,
                      movieId: currentlyReviewingMovieId as number,
                      reviewText: e.target.value,
                    });
                  }}
                  style={{
                    marginTop: theme.spacing(1),
                    width: "100%",
                    height: "100px",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                />
              </>
            }
            options={["Save", "Close"]}
            onOptionClick={(option) => {
              if (option === "Save") {
                !!userId &&
                  !!tempReview &&
                  !!currentlyReviewingMovieId &&
                  setUserReview(
                    userId,
                    currentlyReviewingMovieId as number,
                    tempReview,
                  );
                setIsReviewDialogOpen(false);
              } else {
                setIsReviewDialogOpen(false);
                clearUserReview();
                setTempReview(userReview as UserReview);
              }
            }}
          />
        </Backdrop>
      )}
    </StyledMoviePageWrapper>
  );
};
