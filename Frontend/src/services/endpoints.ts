// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.REACT_APP_API_URL!;
export const endpoints = {
  // Don't call this without first making it return a fixed amount!!! Current amount of movies over 350000
  getMovies: `${baseUrl}/Movies`,
  getMovieWith: (id: number) => `${baseUrl}/Movie/${id}`,
  getMovieReviews: (id: number) => `${baseUrl}/movieReviews/`,
};
