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
  const [isFavorite, setIsFavorite] = useState(false);
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
    showFavorite: true,
    isFavorite,
    disabledFavoriteButton: false,
    onAddToFavoritesClick: () => {
      setIsFavorite(!isFavorite);
    },
    onRatingChange: () => {
      alert("Rating changed");
    },
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <MovieCard {...movieCardProps} />
      <MovieCard {...movieCardProps} />
      <MovieCard {...movieCardProps} />
    </div>
  );
};

MovieCardStory.storyName = "Movie Card";
