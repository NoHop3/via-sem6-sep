import { type Movie } from "../../shared/models";
import {
  MovieCardWrapper,
  MovieInfo,
  MovieInfoWrapper,
} from "./movieCard.styles";

export const _MovieCard = ({ ...props }: Movie) => {
  return (
    <MovieCardWrapper>
      <MovieInfoWrapper>
        <MovieInfo>
          Title: {props.title}, Year: {props.year}
        </MovieInfo>
      </MovieInfoWrapper>
    </MovieCardWrapper>
  );
};
