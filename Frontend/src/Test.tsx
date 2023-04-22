import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "./shared/models/movie";
import { endpoints } from "./services/endpoints";

export const Test = () => {
  const [movie, setMovie] = useState<Movie>();
  const [movieId, setMovieId] = useState(59680);
  const handleMovieId = () => {
    // Randomly select a movieId from the list of movieIds but different from the current movieId
    let rndMovie = movieId;
    while (rndMovie === movieId) {
      rndMovie = [59680, 56166, 60144, 61592][Math.floor(Math.random() * 4)];
    }
    setMovieId(rndMovie);
  };
  useEffect(() => {
    axios
      .get(`${endpoints.getMovieWith(movieId)}`)
      .then((res) => {
        // eslint-disable-next-line
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <>
      <div>
        Test! Data for movie with id {movieId}: {movie?.title}, {movie?.year}
      </div>
      <div>
        <button
          onClick={() => {
            handleMovieId();
          }}
        >
          Try another movieId
        </button>
      </div>
    </>
  );
};
