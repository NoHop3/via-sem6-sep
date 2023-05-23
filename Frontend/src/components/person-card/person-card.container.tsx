import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import { LazyImage, NoImage } from "../../shared/utils/helpers";
import { PersonCardProps } from "./person-card.props";
import {
  AddToFavoritesButton,
  ContentHolder,
  ImageContainer,
  ItemDescription,
  ItemImageWrapper,
  ItemTitle,
  ItemTitleHolder,
  PersonCardWrapper,
  ItemDate,
} from "./person-card.styles";

export const PersonCard = React.memo((props: PersonCardProps) => {
  return (
    <PersonCardWrapper>
      <ItemImageWrapper>
        <ImageContainer data-search-result-image>
          {props.imgSource ? (
            <LazyImage src={props.imgSource} />
          ) : (
            <NoImage iconSize={80} />
          )}
        </ImageContainer>
        {props.showFavorite && (
          <AddToFavoritesButton
            type="button"
            disabled={!!props.disabledFavoriteButton}
            onClick={(e: React.MouseEvent) => {
              props.onAddToFavoritesClick?.(props.id);
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={props.isFavorite ? faHeartSolid : faHeart} />
          </AddToFavoritesButton>
        )}
      </ItemImageWrapper>
      <ContentHolder>
        <ItemTitleHolder>
          <ItemTitle>{props.title}</ItemTitle>
          <ItemDate>{props.date}</ItemDate>
        </ItemTitleHolder>
        <ItemDescription>{props.description}</ItemDescription>
      </ContentHolder>
    </PersonCardWrapper>
  );
});
