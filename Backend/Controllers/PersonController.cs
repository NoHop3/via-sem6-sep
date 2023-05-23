using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;

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

        [HttpGet("{skip}/{take}")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople(int skip, int take)
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
        public async Task<ActionResult<Dictionary<long, List<Movie>>>> GetPersonAllMovies(long id)
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
