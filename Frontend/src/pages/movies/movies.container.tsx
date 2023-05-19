import { useEffect, useState } from "react";

import { type MovieProps } from "./movies.props";
import { Button, MovieCard } from "../../components";
import {
  StyledCircularProgress,
  StyledMovieCardWrapper,
  StyledMovieGrid,
} from "./movies.styles";
import { Pagination } from "@mui/material";

export const _Movies = (props: MovieProps) => {
  const [movieId, setMovieId] = useState<number>(0);
  const {
    isLoading,
    movie,
    movies,
    page,
    total,
    getMovies,
    getMovieWith,
    setPage,
  } = props;

  const handleMovieIdChange = () => {
    // Randomly select a movieId from the list of movieIds but different from the current movieId
    let rndMovie = movieId;
    while (rndMovie === movieId) {
      rndMovie = [59680, 56166, 60144, 61592][Math.floor(Math.random() * 4)];
    }
    setMovieId(rndMovie);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    getMovies(page, 10);
  }, [getMovies, page]);

  useEffect(() => {
    movieId && movieId !== 0 && getMovieWith(movieId);
  }, [movieId, getMovieWith]);

  return (
    <>
      {!isLoading ? (
        <>
          <StyledMovieGrid container>
            {movies.map((movie) => (
              <StyledMovieCardWrapper key={movie.id}>
                <MovieCard {...movie} />
              </StyledMovieCardWrapper>
            ))}
          </StyledMovieGrid>

          <Pagination
            count={Math.ceil(total / 10)}
            page={page}
            defaultPage={1}
            onChange={handlePageChange}
            size="large"
          />

          <StyledMovieCardWrapper>
            <MovieCard {...movie} />
            <Button
              variant={"contained"}
              color={"primary"}
              disabled={false}
              text={"Click for random movie id"}
              onClick={() => {
                handleMovieIdChange();
              }}
            />
          </StyledMovieCardWrapper>
        </>
      ) : (
        <StyledCircularProgress disableShrink size={"6rem"} />
      )}
    </>
  );
};
