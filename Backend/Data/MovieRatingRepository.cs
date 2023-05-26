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

        

        
    }
}