using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;
using Backend.Utils;
using Backend.DTOs;

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

         // GET: api/Favourite/userId/movieId
        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<Boolean>> GetFavourite(int userId, long movieId)
        {
            return Ok(await _repository.GetFavourite(userId, movieId));
        }

        // POST: api/Favourite/userId/movieId
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
