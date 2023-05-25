using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IReviewRepository
{
    Task<IList<Review>> GetMovieReviews(long movieId);
    Task AddReview(Review review);
    Task DeleteReview(Review review);
}