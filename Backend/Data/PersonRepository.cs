using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Abstraction;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    internal class PersonRepository: IPersonRepository
    {
        private MyDbContext _context;
        public PersonRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Person>> GetAllStars()
        {
            var personIds =  await _context.Stars.Select(x=>x.PersonId).ToListAsync();
            return await _context.People.Where(x=>personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<IList<Person>> GetAllDirectors()
        {
            var personIds =  await _context.Directors.Select(x=>x.PersonId).ToListAsync();
            return await _context.People.Where(x=>personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<Person> GetStarOrDirectorById(long id)
        {
            return await _context.People.Where(x=>x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Dictionary<long, List<Movie>>> GetStarAllMovies(long id)
        {
            var stars = await _context.Stars.Include(x=>x.Movie).Where(x=>x.PersonId == id).ToListAsync();

            var result = stars.GroupBy(x=>x.PersonId).ToDictionary(star=>star.Key, star=>star.Select(x=>x.Movie).ToList());
            return result;
        }
        public async Task<Dictionary<long, List<Movie>>> GetDirectorAllMovies(long id)
        {
            var stars = await _context.Directors.Include(x=>x.Movie).Where(x=>x.PersonId == id).ToListAsync();

            var result = stars.GroupBy(x=>x.PersonId).ToDictionary(star=>star.Key, star=>star.Select(x=>x.Movie).ToList());
            return result;
        }
    }

}