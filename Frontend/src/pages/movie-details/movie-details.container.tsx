import { useState } from "react";
import { StyledCircularProgress, StyledLoadingGridItem } from "../../styles";
import { MovieDetailsProps } from "./movie-details.props";
import {
  MovieDetailsGrid,
  MovieDetailsImage,
  MovieDetailsInfo,
  MovieDetailsInfoItem,
  MovieDetailsPageWrapper,
  MovieDetailsTitle,
} from "./movie-details.styles";

export const _MovieDetails = (props: MovieDetailsProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };
  const { isLoading, movie } = props;
  const { title, year, director, posterUrl, rating, stars } = movie;

  return (
    <MovieDetailsPageWrapper>
      {isLoading ? (
        <StyledCircularProgress disableShrink size={"6rem"} />
      ) : (
        <MovieDetailsGrid>
          {loaded ? (
            <MovieDetailsTitle>{title}</MovieDetailsTitle>
          ) : (
            <StyledLoadingGridItem gridArea="title" height="6rem" />
          )}
          {!loaded && (
            <StyledLoadingGridItem
              gridArea="image"
              width="100%"
              height="40rem"
            />
          )}
          <MovieDetailsImage
            src={posterUrl}
            alt={title + " poster"}
            onLoad={handleImageLoad}
            style={{ display: loaded ? "block" : "none" }}
          />
          {loaded ? (
            <MovieDetailsInfo>
              <MovieDetailsInfoItem>Year: {year}</MovieDetailsInfoItem>
              {director && (
                <MovieDetailsInfoItem>
                  Director: {director.name}
                </MovieDetailsInfoItem>
              )}
              {rating && (
                <MovieDetailsInfoItem>
                  Rating: {rating?.rating}
                </MovieDetailsInfoItem>
              )}
              {stars?.map((star) => (
                <MovieDetailsInfoItem key={star.id}>
                  Star: {star.name}
                </MovieDetailsInfoItem>
              ))}
            </MovieDetailsInfo>
          ) : (
            <StyledLoadingGridItem gridArea="info" />
          )}
        </MovieDetailsGrid>
      )}
    </MovieDetailsPageWrapper>
  );
};
