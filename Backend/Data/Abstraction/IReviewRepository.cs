using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IReviewRepository
{
    Task<IList<Review>> GetMovieReviews(long movieId);
    Task<Review> GetReview(int userId, long movieId);
    Task SetReview(Review review);
    Task DeleteReview(int id);
}