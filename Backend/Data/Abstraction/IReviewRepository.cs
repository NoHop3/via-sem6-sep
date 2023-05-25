using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IReviewRepository
{
    Task<Review> GetReview(int userId, long movieId);
    Task SetReview(Review review);
    Task<IList<Review>> GetMovieReviews(long movieId);
    Task AddReview(Review review);
    Task DeleteReview(Review review);
}