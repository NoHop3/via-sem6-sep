/* eslint-disable @typescript-eslint/no-non-null-assertion */
const baseUrl = process.env.REACT_APP_API_URL!;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY!;
const omdbUrl = "https://www.omdbapi.com/";
export const endpoints = {
  getMovies: (skip: number, take: number) => `${baseUrl}/Movie/${skip}/${take}`,
  getMovieWith: (id: number) => `${baseUrl}/Movie/${id}`,
  getOmdbMovieWith: (id: number) => `${omdbUrl}?i=tt${id}&apikey=${omdbApiKey}`,
};
