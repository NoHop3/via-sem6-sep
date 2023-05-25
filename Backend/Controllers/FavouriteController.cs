using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        private readonly IFavouriteRepository _repository;
        private readonly IUserRepository _userRepository;

        public FavouriteController(IFavouriteRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        // GET: api/Favourite/5
        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<Boolean>> GetFavourite(int userId, long movieId)
        {
            return Ok(await _repository.GetFavourite(userId, movieId));
        }

        // GET: api/FavouriteMovies/5/0/10
        [HttpGet("{id}/{skip}/{limit}")]
        public async Task<ActionResult<Dictionary<int, List<Movie>>>> GetUserFavouriteMovies(int id, int skip, int limit)
        {

            var movies = await _repository.GetUserFavouritesByIdWithLimit(id, skip, limit);
            if (movies.Count == 0)
            {
                return NotFound();
            }
            return Ok(movies);
        }

        // POST: api/setFavorite
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{userId}/{movieId}")]
        public async Task<ActionResult> SetFavorite(int userId, long movieId)
        {
            try
            {
                await _repository.SetFavourite(new Favourite
                {
                    UserId = userId,
                    MovieId = movieId
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
