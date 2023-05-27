import { useState } from "react";
import { _Button as Button } from "../shared/button/button";
import {
  MovieGrid,
  MovieTitle,
  MovieImage,
  MovieRating,
  MovieInfo,
  MovieButtonsWrapper,
} from "./movie-card.styles";
import { MovieCardProps } from "./movie-card.props";
import { StyledLoadingGridItem } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { AddToFavoritesButton } from "../shared/card/card.styles";

export const _MovieCard = ({ ...props }: MovieCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [favourite, setFavourite] = useState(props.isFavorite);

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
          size="small"
          name="user-rating"
          precision={0.1}
          defaultValue={props.rating?.rating ?? 0}
          max={10}
          readOnly
        />
      ) : (
        <StyledLoadingGridItem gridArea="rating" />
      )}
      {props.showFavorite && (
        <AddToFavoritesButton
          type="button"
          disabled={!!props.disabledFavoriteButton}
          onClick={(e: React.MouseEvent) => {
            props.userId &&
              props.onAddToFavoritesClick?.(props.userId, props.id);
            setFavourite(!favourite);
            e.stopPropagation();
          }}
          style={{ top: "unset", right: "unset" }}
        >
          <FontAwesomeIcon icon={favourite ? faHeartSolid : faHeart} />
        </AddToFavoritesButton>
      )}
      {loaded ? (
        <MovieButtonsWrapper>
          <Button
            size={"small"}
            variant={"contained"}
            color={"primary"}
            disabled={false}
            text={"Details"}
            onClick={() => {
              props.onMovieClick(props.id);
            }}
          />
          <Button
            size={"small"}
            variant={"contained"}
            color={"primary"}
            disabled={!props.userId}
            text={"Review"}
            onClick={() => {
              !!props.userId && props.getUserReview?.(props.userId, props.id);
            }}
          />
        </MovieButtonsWrapper>
      ) : (
        <StyledLoadingGridItem gridArea="button" />
      )}
    </MovieGrid>
  );
};
