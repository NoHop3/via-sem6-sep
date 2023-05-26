using Backend.DTOs;
using Backend.Models;

namespace Backend.Data.Abstraction
{
    public interface IMovieRepository
    {
        Task<IList<Movie>> GetMovies();
        Task<Movie?> GetMovieById(long id);
        Task<IList<Movie>> GetMoviesLimit(int skip, int limit);
        Task<int> GetMoviesCount();
        Task<IList<Person>> GetMovieStars(long id);
        Task<IList<Person>> GetMovieDirectors(long id);
        Task<IList<ResultItemDTO>> GetMovieBySearchPhase(string searchPhrase, int skip, int limit);
        Task<int> GetMovieBySearchPhaseCount(string searchPhrase);
        Task<IList<ResultItemDTO>> GetMoviesWithHighestRating(int limit);
    }

}