using Backend.Data.Abstraction;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    internal class PersonRepository : IPersonRepository
    {
        private MyDbContext _context;
        public PersonRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Person>> GetAllStarsLimit(int skip, int limit)
        {
            var personIds = await _context.Stars.Skip(skip).Take(limit).Select(x => x.PersonId).ToListAsync();
            return await _context.People.Where(x => personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<IList<Person>> GetAllDirectorsLimit(int skip, int limit)
        {
            var personIds = await _context.Directors.Skip(skip).Take(limit).Select(x => x.PersonId).ToListAsync();
            return await _context.People.Where(x => personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<Person> GetStarOrDirectorById(long id)
        {
            return await _context.People.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Person not found");
        }

        public async Task<Dictionary<long, List<Movie>>> GetStarAllMovies(long id)
        {
            var stars = await _context.Stars.Include(x => x.Movie).Where(x => x.PersonId == id).ToListAsync();

            var result = stars.GroupBy(x => x.PersonId).ToDictionary(star => star.Key, star => star.Select(x => x.Movie).ToList());
            return result;
        }
        public async Task<Dictionary<long, List<Movie>>> GetDirectorAllMovies(long id)
        {
            var stars = await _context.Directors.Include(x => x.Movie).Where(x => x.PersonId == id).ToListAsync();

            var result = stars.GroupBy(x => x.PersonId).ToDictionary(star => star.Key, star => star.Select(x => x.Movie).ToList());
            return result;
        }

        public async Task<IList<Person>> GetAllStars()
        {
            var personIds = await _context.Stars.Select(x => x.PersonId).ToListAsync();
            return await _context.People.Where(x => personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<IList<Person>> GetAllDirectors()
        {
            var personIds = await _context.Directors.Select(x => x.PersonId).ToListAsync();
            return await _context.People.Where(x => personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<IList<Person>> GetPeopleLimit(int skip, int limit)
        {
            return await _context.People.Skip(skip).Take(limit).ToListAsync();
        }

        public async Task<int> GetStarsCount()
        {
            return await _context.Stars.CountAsync();
        }

        public async Task<int> GetDirectorsCount()
        {
            return await _context.Directors.CountAsync();
        }

        public async Task<int> GetPeopleCount()
        {
            return await _context.People.CountAsync();
        }

        public async Task<IList<ResultItemDTO>> GetPersonMovies(long id)
        {
            var stars = await _context.Stars.Include(x => x.Movie).Where(x => x.PersonId == id).ToListAsync();
            var directors = await _context.Directors.Include(x => x.Movie).Where(x => x.PersonId == id).ToListAsync();

            var result = new List<ResultItemDTO>();
            foreach (var star in stars)
            {
                result.Add(new ResultItemDTO { Id = id, Name = star.Movie.Title, Year = star.Movie.Year, Type = "Star" });
            }
            foreach (var director in directors)
            {
                result.Add(new ResultItemDTO { Id = id, Name = director.Movie.Title, Year = director.Movie.Year, Type = "Director" });
            }
            return result;
        }

        public async Task<double> GetActorAvgMoviesRating(long id)
        {
            var movieIds = await _context.Stars.Include(x => x.Movie).Where(x=>x.PersonId == id).Select(x=>x.MovieId).ToListAsync();
            var ratings = _context.Ratings.Where(x=>movieIds.Contains(x.MovieId)).Select(x=>x.Rating);
            var avg = ratings.Sum() / movieIds.Count;
            return avg;
        }
    }
}