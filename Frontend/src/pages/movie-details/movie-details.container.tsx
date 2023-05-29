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
  const { released, runtime, genre, plot, language, country, rated } =
    movie.details;
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
              <MovieDetailsInfoItem label="Rated">{rated}</MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Year"> {year}</MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Released">
                {released}
              </MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Runtime">
                {runtime}
              </MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Genre">{genre}</MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Plot"> {plot}</MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Language">
                {language}
              </MovieDetailsInfoItem>
              <MovieDetailsInfoItem label="Country">
                {country}
              </MovieDetailsInfoItem>

              {director?.map((x) => (
                <MovieDetailsInfoItem label="Director" key={x.id}>
                  {x.name}
                </MovieDetailsInfoItem>
              ))}
              {stars?.map((star) => (
                <MovieDetailsInfoItem label="Starring" key={star.id}>
                  {star.name}
                </MovieDetailsInfoItem>
              ))}
              {rating?.rating !== 0 && (
                <MovieDetailsInfoItem label="Rating">
                  {rating?.rating as number}
                </MovieDetailsInfoItem>
              )}
            </MovieDetailsInfo>
          ) : (
            <StyledLoadingGridItem gridArea="info" />
          )}
        </MovieDetailsGrid>
      )}
    </MovieDetailsPageWrapper>
  );
};
