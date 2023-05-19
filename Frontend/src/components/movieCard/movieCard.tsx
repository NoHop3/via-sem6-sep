import { type Movie } from "../../shared/models";
import { _Button as Button } from "../shared/button/button";
import {
  MovieCardWrapper,
  MovieImage,
  MovieInfo,
  MovieInfoWrapper,
  MovieTitle,
} from "./movieCard.styles";

export const _MovieCard = ({ ...props }: Movie) => {
  return (
    <MovieCardWrapper>
      <MovieTitle>{props.title}</MovieTitle>
      <MovieInfoWrapper>
        <MovieImage
          src={
            "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
          }
          alt={props.title + " image"}
        />
        <MovieInfo>Year: {props.year}</MovieInfo>
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
      </MovieInfoWrapper>
    </MovieCardWrapper>
  );
};
