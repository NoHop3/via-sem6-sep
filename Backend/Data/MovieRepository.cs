using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Abstraction;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    internal class MovieRepository: IMovieRepository
    {
        private MyDbContext _context;
        public MovieRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Movie>> GetMovies()
        {
            return  await _context.Movies.ToListAsync();
        }

        public async Task<int> GetMoviesCount()
        {
            return  await _context.Movies.CountAsync();
        }


        public async Task<IList<Movie>> GetMoviesLimit(int skip, int limit)
        {
            return  await _context.Movies.Skip(skip).Take(limit).ToListAsync();
        }

        public async Task<Movie> GetMovieById(long id)
        {
            return  await _context.Movies.FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<IList<Person>> GetMovieStars(long id)
        {
            var personIds =  await _context.Stars.Where(x=>x.MovieId == id).Select(x=>x.PersonId).ToListAsync();
            return await _context.People.Where(x=>personIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<IList<Person>> GetMovieDirectors(long id)
        {
            var personIds =  await _context.Directors.Where(x=>x.MovieId == id).Select(x=>x.PersonId).ToListAsync();
            return await _context.People.Where(x=>personIds.Contains(x.Id)).ToListAsync();
        }
    }

}