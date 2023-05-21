import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Pagination } from "@mui/material";
import { MovieCard } from "../../components";
import { StyledCircularProgress } from "../../styles";
import {
  StyledMoviePageWrapper,
  StyledMovieGrid,
  StyledMovieCardWrapper,
} from "./movies.styles";
import { type MovieProps } from "./movies.props";

export const _Movies = (props: MovieProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoading,
    movies,
    page,
    total,
    getMovies,
    getMovieDetailsFor,
    setPage,
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
    setPage(Number(queryStrings.page) || 1);
    getMovies(Number(queryStrings.page) || 1, 12);
  }, [location.search, setPage, queryStrings.page, getMovies, navigate, page]);

  const handleMovieCardClick = (id: number) => {
    getMovieDetailsFor(id);
    navigate(`/movies/${id}`);
  };

  return (
    <StyledMoviePageWrapper>
      {!isLoading ? (
        <>
          <Pagination
            count={Math.ceil(total / 12)}
            page={page}
            defaultPage={1}
            onChange={handlePageChange}
            size="large"
          />
          <StyledMovieGrid container>
            {movies.map((movie) => (
              <StyledMovieCardWrapper key={movie.id}>
                <MovieCard {...movie} onMovieClick={handleMovieCardClick} />
              </StyledMovieCardWrapper>
            ))}
          </StyledMovieGrid>

          <Pagination
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
