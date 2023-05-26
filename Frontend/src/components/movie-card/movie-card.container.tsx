import { useState } from "react";
import { _Button as Button } from "../shared/button/button";
import {
  MovieGrid,
  MovieTitle,
  MovieImage,
  MovieRating,
  MovieInfo,
} from "./movie-card.styles";
import { MovieCardProps } from "./movie-card.props";
import { StyledLoadingGridItem } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { AddToFavoritesButton } from "../shared/card/card.styles";

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
        <MovieRating
          sx={{ opacity: props.userId ? 1 : 0 }}
          size="small"
          name="user-rating"
          defaultValue={props.userRating ?? 0}
          max={10}
          onChange={(event, newValue) => {
            props.userId &&
              newValue &&
              props.onRatingChange?.(props.userId, props.id, newValue);
          }}
        />
      ) : (
        <StyledLoadingGridItem gridArea="rating" />
      )}
      {props.showFavorite && props.userId && (
        <AddToFavoritesButton
          type="button"
          disabled={!!props.disabledFavoriteButton}
          onClick={(e: React.MouseEvent) => {
            props.userId &&
              props.onAddToFavoritesClick?.(props.userId, props.id);
            e.stopPropagation();
          }}
          style={{ top: undefined, right: undefined }}
        >
          <FontAwesomeIcon icon={props.isFavorite ? faHeartSolid : faHeart} />
        </AddToFavoritesButton>
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
