using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Abstraction;
using Backend.DTOs;
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
            return  await _context.Movies.OrderBy(x=>x.Id).Skip(skip).Take(limit).ToListAsync();
        }

        public async Task<Movie?> GetMovieById(long id)
        {
            return  await _context.Movies.FirstOrDefaultAsync(x=>x.Id == id) ?? null;
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

        public async Task<IList<ResultItemDTO>> GetMovieBySearchPhase(string searchPhrase, int skip, int limit)
        {
            var movies = await _context.Ratings.Include(x=>x.Movie).Where(x=>x.Movie.Title.Contains(searchPhrase)).OrderBy(x=>x.Id).Skip(skip).Take(limit).ToListAsync();
            IList<ResultItemDTO> resultItems = new List<ResultItemDTO>();
            foreach(var movie in movies)
            {
                ResultItemDTO ri = new()
                {
                    Id = movie.Movie.Id,
                    Name = movie.Movie.Title,
                    Year = movie.Movie.Year,
                    Rating = movie.Rating,
                    Type = "Movie"
                };
                resultItems.Add(ri);
            }
            return resultItems;
        }

        public async Task<int> GetMovieBySearchPhaseCount(string searchPhrase)
        {
            var movies = await _context.Movies.Where(x=>x.Title.Contains(searchPhrase)).Select(x=>x.Id).ToListAsync();
            return movies.Count;
        }

        public async Task<IList<ResultItemDTO>> GetMoviesWithHighestRating(int limit)
        {
            var movies = await _context.Ratings.Include(x=>x.Movie).OrderByDescending(x=>x.Rating).Take(limit).ToListAsync();
            IList<ResultItemDTO> resultItems = new List<ResultItemDTO>();
            foreach(var movie in movies)
            {
                ResultItemDTO ri = new()
                {
                    Id = movie.Movie.Id,
                    Name = movie.Movie.Title,
                    Year = movie.Movie.Year,
                    Rating = movie.Rating,
                    Type = "Movie"
                };
                resultItems.Add(ri);
            }
            return resultItems;
        }
    }

}