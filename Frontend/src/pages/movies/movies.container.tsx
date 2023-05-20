import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const {
    isLoading,
    movies,
    page,
    total,
    getMovies,
    getMovieDetailsFor,
    setPage,
  } = props;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleMovieCardClick = (id: number) => {
    getMovieDetailsFor(id);
    navigate(`/movies/${id}`);
  };

  useEffect(() => {
    getMovies(page, 12);
  }, [getMovies, page]);

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
