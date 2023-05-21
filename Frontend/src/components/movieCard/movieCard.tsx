import { useState } from "react";
import { _Button as Button } from "../shared/button/button";
import {
  MovieGrid,
  MovieImage,
  MovieInfo,
  MovieTitle,
} from "./movieCard.styles";
import { MovieCardProps } from "./movieCard.props";
import { StyledLoadingGridItem } from "../../styles";

export const _MovieCard = ({ ...props }: MovieCardProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <MovieGrid>
      {loaded ? (
        <MovieTitle>{props.title}</MovieTitle>
      ) : (
        <StyledLoadingGridItem gridArea="title" height="3rem" />
      )}
      {!loaded && (
        <StyledLoadingGridItem
          gridArea="image"
          width="12.5rem"
          height="16rem"
        />
      )}
      <MovieImage
        src={props.posterUrl}
        alt={props.title + " image"}
        onLoad={handleImageLoad}
        style={{ display: loaded ? "block" : "none" }}
      />
      {loaded ? (
        <MovieInfo>Year: {props.year}</MovieInfo>
      ) : (
        <StyledLoadingGridItem gridArea="info" />
      )}
      {loaded ? (
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"See more"}
          onClick={() => {
            props.onMovieClick(props.id);
          }}
          style={{ gridArea: "button" }}
        />
      ) : (
        <StyledLoadingGridItem gridArea="button" />
      )}
    </MovieGrid>
  );
};
