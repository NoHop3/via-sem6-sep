using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
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
        private readonly IUserRepository _userRepository;

        public ReviewController(IReviewRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        // GET: api/FavouriteMovies
        [HttpGet("{id}")]
        public async Task<ActionResult<IList<ReviewDTO>>> GetMovieReviews([FromRoute] long id)
        {

            var reviews =  await _repository.GetMovieReviews(id);
            if (reviews.Count == 0)
            {
                return NotFound();
            }
            var reviewDTOs = Mapper.MapReviewToDTOList(reviews);
            return Ok(reviewDTOs);
        }

        // POST: api/FavouriteMovies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IList<ReviewDTO>>> AddMovieReview([FromBody] ReviewDTO reviewDTO)
        {
            var userId = await _userRepository.GetUserIdByEmailOrUsername(reviewDTO.Username);
            var review = Mapper.MapReviewFromDTO(reviewDTO, userId);
            try
            {
                await _repository.AddReview(review);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
            var reviews = await _repository.GetMovieReviews(reviewDTO.MovieId);
            var reviewDTOs = Mapper.MapReviewToDTOList(reviews);
            return CreatedAtAction("AddFavouriteMovie", reviewDTOs);
        }

        // DELETE: api/MovieRating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpDelete]
        public async Task<ActionResult<IList<ReviewDTO>>> DeleteFavouriteMovie([FromBody] ReviewDTO reviewDTO)
        {
            var userId = await _userRepository.GetUserIdByEmailOrUsername(reviewDTO.Username);
            var review = Mapper.MapReviewFromDTO(reviewDTO, userId);
            try
            {
                await _repository.DeleteReview(review);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
            var reviews = await _repository.GetMovieReviews(reviewDTO.MovieId);
            var reviewDTOs = Mapper.MapReviewToDTOList(reviews);
            return Ok(reviewDTOs);
        }
    }
}
