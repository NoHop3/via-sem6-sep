import { useEffect } from "react";

import { type MovieProps } from "./movies.props";
import { MovieCard } from "../../components";
import {
  StyledMoviePageWrapper,
  StyledMovieGrid,
  StyledMovieCardWrapper,
  StyledCircularProgress,
} from "./movies.styles";
import { Pagination } from "@mui/material";

export const _Movies = (props: MovieProps) => {
  const { isLoading, movies, page, total, getMovies, setPage } = props;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
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
                <MovieCard {...movie} />
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
