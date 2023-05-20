using Backend.Models;

namespace Backend.Data.Abstraction
{
    public interface IMovieRatingRepository
    {
        Task<MovieRating> GetMovieRating(long id);
        Task<IList<MovieRating>> GetRatings(long[] ids);
        Task<MovieRating> AddRating(MovieRating movieRating);
    }
}