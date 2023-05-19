import { useState } from "react";
import { Movie } from "../../shared/models";
import { _Button as Button } from "../shared/button/button";
import {
  MovieButtonLoading,
  MovieGridWrapper,
  MovieImage,
  MovieImageLoading,
  MovieInfo,
  MovieInfoLoading,
  MovieTitle,
  MovieTitleLoading,
} from "./movieCard.styles";

export const _MovieCard = ({ ...props }: Movie) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <MovieGridWrapper>
      {loaded ? <MovieTitle>{props.title}</MovieTitle> : <MovieTitleLoading />}
      {!loaded && <MovieImageLoading />}
      <MovieImage
        src={
          props.posterUrl
            ? props.posterUrl
            : "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
        }
        alt={props.title + " image"}
        onLoad={handleImageLoad}
        style={{ display: loaded ? "block" : "none" }}
      />
      {loaded ? (
        <MovieInfo>Year: {props.year}</MovieInfo>
      ) : (
        <MovieInfoLoading />
      )}
      {loaded ? (
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"See more"}
          onClick={() => {
            alert("Clicked");
          }}
          style={{ gridArea: "button" }}
        />
      ) : (
        <MovieButtonLoading />
      )}
    </MovieGridWrapper>
  );
};
