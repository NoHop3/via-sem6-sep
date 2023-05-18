// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseUrl = process.env.REACT_APP_API_URL!;
export const endpoints = {
  getMovies: (skip: number, take: number) => `${baseUrl}/Movie/${skip}/${take}`,
  getMovieWith: (id: number) => `${baseUrl}/Movie/${id}`,
  getMovieReviews: (id: number) => `${baseUrl}/movieReviews/`,
};
