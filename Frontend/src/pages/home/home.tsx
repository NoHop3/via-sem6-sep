import { Card } from "../../components";
import { IHomeProps } from "./home.props";
import {
  StyledHomeGrid,
  StyledHomeTitle,
  StyledHomeWrapper,
} from "./home.styles";
import { ResultItem } from "../../shared/utils/typescript/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const _Home = (props: IHomeProps) => {
  const navigate = useNavigate();
  const { getHighestRated, items, getMovieDetailsFor } = props;
  useEffect(() => {
    items.length === 0 && getHighestRated();
  }, [getHighestRated, items.length]);
  const handleHighestRatedClick = (id: number) => {
    navigate(`/movies/${id}`);
    getMovieDetailsFor(id);
  };

  return (
    <StyledHomeWrapper>
      <StyledHomeTitle>5 Top Rated Movies</StyledHomeTitle>
      <StyledHomeGrid>
        <>
          {items.map((item: ResultItem, i) => (
            <Card
              key={i}
              id={item.id}
              title={item.name}
              description={item.type}
              date={String(item.year)}
              imgSource={item.poster}
              showFavorite={false}
              onCardClick={() => {
                handleHighestRatedClick(item.id as number);
              }}
            />
          ))}
        </>
      </StyledHomeGrid>
    </StyledHomeWrapper>
  );
};
