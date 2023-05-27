using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IPersonRepository _personRepository;

        public HomeController(IMovieRepository movieRepository, IPersonRepository personRepository)
        {
            _movieRepository = movieRepository;
            _personRepository = personRepository;
        }

        // GET: api/Home/Search?searchPhrase={searchPhrase}&skip={skip}&limit={limit}
        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<IList<ResultItemDTO>>> Search([FromQuery] string searchPhrase, [FromQuery] int skip, [FromQuery] int limit)
        {
            var movies = await _movieRepository.GetMovieBySearchPhase(searchPhrase, skip, limit);
            var movieCount = await _movieRepository.GetMovieBySearchPhaseCount(searchPhrase);
            var people = await _personRepository.GetPeopleBySearchPhase(searchPhrase, skip, limit);
            var peopleCount = await _personRepository.GetPeopleBySearchPhaseCount(searchPhrase);
            if (movies.Count == 0 && people.Count == 0)
            {
                return NotFound();
            }
            var result = new List<ResultItemDTO>();
            result.AddRange(movies);
            result.AddRange(people);
            result = result.OrderBy(x => x.Name).ToList().Skip(skip).Take(limit).ToList();
            var total = movieCount + peopleCount;
            return Ok(new {result, total});
        }

        // GET: api/Home/HighestRatings
        [HttpGet]
        [Route("HighestRatings")]
        public async Task<ActionResult<IList<ResultItemDTO>>> GetMoviesAndActorsWithHighestRating()
        {
            //It was desided that we will get the first 5 for the homepage
            var movies = await _movieRepository.GetMoviesWithHighestRating(5);
            //var actors = await _personRepository.GetActorsWithHighestAvgMoviesRating(5);
            if (movies.Count == 0 /*&& actors.Count == 0*/)
            {
                return NotFound();
            }
            var result = new List<ResultItemDTO>();
            result.AddRange(movies);
           // result.AddRange(actors);
            return Ok(result);
        }
        
    }
}
