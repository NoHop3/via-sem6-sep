using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _repository;
        private readonly IUserRepository _userRepository;

        public ReviewController(IReviewRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        // GET: api/Review/userId/movieId
        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<Review>> GetReview(int userId, long movieId)
        {
            var review = await _repository.GetReview(userId, movieId);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        // POST: api/setReview/userId/movieId/rating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{userId}/{movieId}/{rating}")]
        public async Task<ActionResult> SetReview(int userId, long movieId, int rating)
        {
            try
            {
                await _repository.SetReview(new Review
                {
                    UserId = userId,
                    MovieId = movieId,
                    ReviewStars = rating
                });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }
    }
}
