using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StarController : ControllerBase
    {
        private readonly IPersonRepository _repository;

        public StarController(IPersonRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Stars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Star>>> GetStars()
        {
            var stars = await _repository.GetAllStars();
            if (stars.Count == 0)
            {
                return NotFound();
            }
            return Ok(stars);
        }

        // GET: api/Star/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Star>> GetStar(long id)
        {
            var star = await _repository.GetStarOrDirectorById(id);
            if (star == null)
            {
                return NotFound();
            }
            return Ok(star);
        }

        // GET: api/Star/5/Movies
        [HttpGet("{id}/Movies")]
        public async Task<ActionResult<Dictionary<long, List<Movie>>>> GetStarAllMovies(long id)
        {
            var stars = await _repository.GetStarAllMovies(id);
            if (stars.Count == 0)
            {
                return NotFound();
            }

            return Ok(stars);
        }

    
    }
}
