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
    public class FavouriteMoviesController : ControllerBase
    {
        private readonly IFavouriteMovieRepository _repository;
        private readonly IUserRepository _userRepository;

        public FavouriteMoviesController(IFavouriteMovieRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        // GET: api/FavouriteMovies
        [HttpGet]
        public async Task<ActionResult<Dictionary<int, List<Movie>>>> GetUserFavouriteMovies([FromHeader] string emailOrUsername)
        {

            var movies = await _repository.GetUserFavouritesByEmailOrUsername(emailOrUsername);
            if (movies.Count == 0)
            {
                return NotFound();
            }
            return Ok(movies);
        }

        // POST: api/FavouriteMovies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dictionary<int, List<Movie>>>> AddFavouriteMovie([FromBody] FavouriteDTO favouriteDTO)
        {
            var userId = await _userRepository.GetUserIdByEmailOrUsername(favouriteDTO.UserEmailOrUsername);
            var favourite = Mapper.MapFavouriteMoviteFromDTO(favouriteDTO, userId);
            try
            {
                await _repository.AddFavourite(favourite);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            var userMovies = await _repository.GetUserFavouritesByEmailOrUsername(favouriteDTO.UserEmailOrUsername);
            return CreatedAtAction("AddFavouriteMovie", userMovies);
        }

        // DELETE: api/MovieRating
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpDelete]
        public async Task<ActionResult<Dictionary<int, List<Movie>>>> DeleteFavouriteMovie([FromBody] FavouriteDTO favouriteDTO)
        {
            var userId = await _userRepository.GetUserIdByEmailOrUsername(favouriteDTO.UserEmailOrUsername);
            var favourite = Mapper.MapFavouriteMoviteFromDTO(favouriteDTO, userId);
            try
            {
                await _repository.DeleteFavourite(favourite);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            var userMovies = await _repository.GetUserFavouritesByEmailOrUsername(favouriteDTO.UserEmailOrUsername);
            return Ok(userMovies);
        }
    }
}
