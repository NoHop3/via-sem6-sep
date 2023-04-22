import { useEffect, useState } from "react";

import { type MovieProps } from "./movies.props";
import { Button, MovieCard } from "../../components";
import {
  StyledCircularProgress,
  StyledMovieCardWrapper,
} from "./movies.styles";

export const _Movies = (props: MovieProps) => {
  const [movieId, setMovieId] = useState<number>(0);
  const { getMovieWith, isLoading, movie } = props;

  const handleMovieIdChange = () => {
    // Randomly select a movieId from the list of movieIds but different from the current movieId
    let rndMovie = movieId;
    while (rndMovie === movieId) {
      rndMovie = [59680, 56166, 60144, 61592][Math.floor(Math.random() * 4)];
    }
    setMovieId(rndMovie);
  };

  useEffect(() => {
    movieId && movieId !== 0 && getMovieWith(movieId);
  }, [movieId, getMovieWith]);

  return (
    <>
      {!isLoading ? (
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
      ) : (
        <StyledCircularProgress disableShrink size={"6rem"} />
      )}
    </>
  );
};
