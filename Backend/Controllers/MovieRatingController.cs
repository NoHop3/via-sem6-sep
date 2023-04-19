using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieRatingController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MovieRatingController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/MovieRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieRating>>> GetMovieRatings()
        {
            if (_context.MovieRatings == null)
            {
                return NotFound();
            }
            return await _context.MovieRatings.ToListAsync();
        }

        // GET: api/MovieRating/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieRating>> GetMovieRating(int id)
        {
            if (_context.MovieRatings == null)
            {
                return NotFound();
            }
            var movieRating = await _context.MovieRatings.FindAsync(id);

            if (movieRating == null)
            {
                return NotFound();
            }

            return movieRating;
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

            _context.Entry(movieRating).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieRatingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MovieRating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieRating>> PostMovieRating(MovieRating movieRating)
        {
            if (_context.MovieRatings == null)
            {
                return Problem("Entity set 'MyDbContext.MovieRatings'  is null.");
            }
            _context.MovieRatings.Add(movieRating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieRating", new { id = movieRating.MovieId }, movieRating);
        }

        // DELETE: api/MovieRating/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieRating(int id)
        {
            if (_context.MovieRatings == null)
            {
                return NotFound();
            }
            var movieRating = await _context.MovieRatings.FindAsync(id);
            if (movieRating == null)
            {
                return NotFound();
            }

            _context.MovieRatings.Remove(movieRating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieRatingExists(int id)
        {
            return (_context.MovieRatings?.Any(e => e.MovieId == id)).GetValueOrDefault();
        }
    }
}
