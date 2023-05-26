import type { StoryObj } from "@storybook/react";

import { _MovieCard as MovieCard } from "./movie-card.container";
import { MovieCardProps } from "./movie-card.props";
import { useState } from "react";

export default {
  title: "MovieCard",
  component: MovieCard,
};
type Story = StoryObj<typeof MovieCard>;

export const MovieCardStory: Story = () => {
  const [isFavorite, setIsFavorite] = useState([false, false, false]);
  const movieCardProps: MovieCardProps = {
    id: 1,
    title: "Movie Title",
    year: 2021,
    onMovieClick: () => {
      alert("Movie clicked");
    },
    details: {},
    posterUrl: "https://picsum.photos/200/300",
    director: [
      { name: "Director 1", id: 1, birth: 1991, movies: [] },
      { name: "Director 2", id: 2, birth: 1992, movies: [] },
    ],
    stars: [
      { name: "Star 1", id: 1, birth: 1991, movies: [] },
      { name: "Star 2", id: 2, birth: 1992, movies: [] },
    ],
    rating: {
      id: 1,
      votes: 100,
      rating: 5,
    },
    userId: 1,
    showFavorite: true,
    disabledFavoriteButton: false,
    onRatingChange: () => {
      alert("Rating changed");
    },
  };
  console.log(isFavorite);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <MovieCard
        {...movieCardProps}
        isFavorite={isFavorite[0]}
        onAddToFavoritesClick={() => {
          setIsFavorite([!isFavorite[0], ...isFavorite.slice(1)]);
        }}
      />
      <MovieCard
        {...movieCardProps}
        isFavorite={isFavorite[1]}
        onAddToFavoritesClick={() => {
          setIsFavorite(
            isFavorite.slice(0, 1).concat(!isFavorite[1], isFavorite.slice(2)),
          );
        }}
      />
      <MovieCard
        {...movieCardProps}
        isFavorite={isFavorite[2]}
        onAddToFavoritesClick={() => {
          setIsFavorite([...isFavorite.slice(0, 2), !isFavorite[2]]);
        }}
      />
    </div>
  );
};

MovieCardStory.storyName = "Movie Card";
