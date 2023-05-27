using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _repository;

        public PersonController(IPersonRepository repository)
        {
            _repository = repository;
        }
        // GET: api/Person?skip=0&limit=10
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople([FromQuery] int skip, [FromQuery] int take)
        {
            var people = await _repository.GetPeopleLimit(skip, take);
            if (people.Count == 0)
            {
                return NotFound();
            }
            var count = await _repository.GetPeopleCount();
            return Ok(new { count, people });
        }

        // GET: api/Person/5/Movies
        [HttpGet("{id}/Movies")]
        public async Task<ActionResult<IList<ResultItemDTO>>> GetPersonAllMovies(long id)
        {
            var movies = await _repository.GetPersonMovies(id);
            if (movies.Count == 0)
            {
                return NotFound();
            }

            return Ok(movies);
        }
    }
}
