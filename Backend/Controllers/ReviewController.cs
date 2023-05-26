using Microsoft.AspNetCore.Mvc;
using Backend.Data.Abstraction;
using Backend.Utils;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _repository;

        public ReviewController(IReviewRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<ReviewDTO>> GetReview(int userId, long movieId)
        {
            var review = await _repository.GetReview(userId, movieId);
            if (review == null)
            {
                return NotFound();
            }
            var reviewDTO = Mapper.MapReviewToDTO(review);
            return Ok(reviewDTO);
        }

        // GET: api/Review/id?skip=0&limit=10
        [HttpGet("{id}?skip={skip}&limit={limit}")]
        public async Task<ActionResult<IList<ReviewDTO>>> GetMovieReviews([FromRoute] long id, [FromQuery] int skip, [FromQuery] int limit)
        {

            var reviews =  await _repository.GetMovieReviews(id);
            if (reviews.Count == 0)
            {
                return NotFound();
            }
            var reviewDTOs = Mapper.MapReviewToDTOList(reviews);
            return Ok(reviewDTOs);
        }

        // POST: api/Review
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IList<ReviewDTO>>> SetMovieReview([FromBody] ReviewDTO reviewDTO)
        {
            var review = Mapper.MapReviewFromDTO(reviewDTO);
            try
            {
                await _repository.SetReview(review);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            var reviews = await _repository.GetMovieReviews(reviewDTO.MovieId);
            var reviewDTOs = Mapper.MapReviewToDTOList(reviews);
            return CreatedAtAction("Review", reviewDTOs);
        }

        // DELETE: api/Review
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovieReview([FromRoute] int id)
        {
            try
            {
                await _repository.DeleteReview(id);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }
    }
}
