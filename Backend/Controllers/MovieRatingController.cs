using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieRatingController : ControllerBase
    {
        private readonly IMovieRatingRepository _repository;

        public MovieRatingController(IMovieRatingRepository repository)
        {
            _repository = repository;
        }

        // GET: api/MovieRating/5
        [HttpGet("{movieId}")]
        public async Task<ActionResult<MovieRating>> GetMovieRating(long movieId)
        {
            var rating = await _repository.GetMovieRating(movieId);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        // PUT: api/MovieRating/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieRating(int id, MovieRating movieRating)
        {
            if (id != movieRating.MovieId)
            {
                return BadRequest();
            }
            try
            {
                await _repository.AddRating(movieRating);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

        // POST: api/MovieRating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieRating>> PostMovieRating(MovieRating movieRating)
        {
            try
            {
                await _repository.AddRating(movieRating);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction("GetMovieRating", new { id = movieRating.MovieId }, movieRating);
        }
    }
}
