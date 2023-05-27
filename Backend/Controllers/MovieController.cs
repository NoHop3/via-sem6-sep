using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _repository;

        public MovieController(IMovieRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Movie?skip=0&take=10
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies([FromQuery] int skip, [FromQuery] int take)
        {
            var movies = await _repository.GetMoviesLimit(skip, take);
            if (movies.Count == 0)
            {
                return NotFound();
            }
            // return response containing list of movies as well as the total number of movies
            var total = await _repository.GetMoviesCount();
            return Ok(new { movies, total });
        }

        // GET: api/Movie/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(long id)
        {
            var movie = await _repository.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        // GET: api/Movie/5/Stars
        [HttpGet("{id}/Stars")]
        public async Task<ActionResult<Movie>> GetMovieStars(long id)
        {
            var stars = await _repository.GetMovieStars(id);
            if (stars.Count == 0)
            {
                return NotFound();
            }

            return Ok(stars);
        }

        // GET: api/Movie/5/Directors
        [HttpGet("{id}/Directors")]
        public async Task<ActionResult<Movie>> GetMovieDirectors(long id)
        {
            var directors = await _repository.GetMovieDirectors(id);
            if (directors.Count == 0)
            {
                return NotFound();
            }

            return Ok(directors);
        }
        //GET: api/Movie/5/Reviews

    }
}
