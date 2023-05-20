using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Abstraction
{
    public interface IMovieRepository
    {
        Task<IList<Movie>> GetMovies();
        Task<Movie> GetMovieById(long id);
        Task<IList<Movie>> GetMoviesLimit(int skip, int limit);
        Task<int> GetMoviesCount();
        Task<IList<Person>> GetMovieStars(long id);
        Task<IList<Person>> GetMovieDirectors(long id);
    }

}