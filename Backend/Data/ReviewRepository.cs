using Backend.Data.Abstraction;
using Backend.DTOs;
using Backend.Models;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;
internal class ReviewRepository : IReviewRepository
{
    private readonly MyDbContext _context;
    public ReviewRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<Review> GetReview(int userId, long movieId)
    {
        var review = await _context.Reviews.FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);
        if (review == null)
        {
            return null;
        }
        var ReviewToReturn = new Review
        {
            Id = review.Id,
            UserId = review.UserId,
            MovieId = review.MovieId,
            ReviewStars = review.ReviewStars,
        };
        return ReviewToReturn;
    }

    public async Task SetReview(Review review)
    {
        var rev = await _context.Reviews.FirstOrDefaultAsync(x => x.UserId == review.UserId && x.MovieId == review.MovieId);
        if (rev != null)
        {
            await DeleteReview(rev);
        }
        await AddReview(review);
    }
    public async Task AddReview(Review review)
    {
        await _context.Reviews.AddAsync(review);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteReview(Review review)
    {
        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();
    }

    public async Task<IList<Review>> GetMovieReviews(long movieId)
    {
        var reviews = await _context.Reviews.Include(x => x.User).Where(x => x.MovieId == movieId).ToListAsync();
        return reviews;
    }
}