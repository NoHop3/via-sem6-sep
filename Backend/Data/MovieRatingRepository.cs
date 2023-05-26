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
    internal class MovieRatingRepository: IMovieRatingRepository
    {
        private readonly MyDbContext _context;
        public MovieRatingRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<MovieRating> GetMovieRating(long id)
        {
            return await _context.Ratings.Where(x=>x.MovieId == id).FirstOrDefaultAsync() ?? throw new Exception("Movie rating not found");
        }

        public async Task<IList<MovieRating>> GetRatings(long[] ids)
        {
            var ratings = await _context.Ratings.Where(x=>ids.Contains(x.MovieId)).ToListAsync();
            return ratings;
        }

        // public async Task UpdateRatings(int newRatingToAdd, long movieId)
        // {
        //     var rating = await _context.Ratings.Where(x=>x.MovieId == movieId).FirstOrDefaultAsync();
        //     var newRating = (rating.Rating * rating.Votes + newRatingToAdd) / (rating.Votes+1);
        //     rating.Rating = newRating;
        //     rating.Votes ++;
        //     await _context.SaveChangesAsync();
        //     return rating; 
        //     _context.Entry(movieRating).State = EntityState.Modified;
        // }

        public async Task<MovieRating> AddRating(MovieRating movieRating)
        {
            if(_context.Ratings.Select(x=>x.MovieId).Contains(movieRating.MovieId))
            {
                _context.Entry(movieRating).State = EntityState.Modified;
            }
            else
            {
                await _context.Ratings.AddAsync(movieRating);
            }
            await _context.SaveChangesAsync();
            return movieRating;
        }

        public async Task<IList<ResultItemDTO>> GetMoviesWithHighestRating(int limit)
        {
            var movies = await _context.Ratings.Include(x=>x.Movie).OrderBy(x=>x.Rating).Take(limit).ToListAsync();
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

        public async Task<IList<ResultItemDTO>> GetActorsWithHighestAvgMoviesRating(int limit)
        {
            var stars = await _context.Stars.Include(x => x.Movie).ToListAsync();
            var moviesDictionary = stars.GroupBy(x => x.PersonId).ToDictionary(star => star.Key, star => star.Select(x => x.Movie.Id).ToList());
            IList<ResultItemDTO> resultItems = new List<ResultItemDTO>();
            foreach(var starMovie in moviesDictionary)
            {
                var ratings = _context.Ratings.Where(x=>starMovie.Value.Contains(x.MovieId)).Select(x=>x.Rating);
                var avg = ratings.Sum() / starMovie.Value.Count;
                var star = await _context.People.FirstOrDefaultAsync(x=>x.Id == starMovie.Key);
                ResultItemDTO ri = new()
                {
                    Id = star.Id,
                    Name = star.Name,
                    Year = star.Birth,
                    Rating = avg,
                    Type = "Actor"
                };
                resultItems.Add(ri);
            }
            var result = resultItems.OrderBy(x=>x.Rating).Take(limit).ToList();
            return result;
        }
    }
}