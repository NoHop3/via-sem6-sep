using Backend.Data.Abstraction;
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
        var reviews =  await _context.Reviews.Include(x=>x.User).Where(x=>x.MovieId == movieId).ToListAsync();
        return reviews;
    }
}