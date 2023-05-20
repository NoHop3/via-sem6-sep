using Backend.Models;

namespace Backend.Data.Abstraction
{
    public interface IPersonRepository
    {
        Task<IList<Person>> GetAllStars();
        Task<IList<Person>> GetAllDirectors();
        Task<Person> GetStarOrDirectorById(long id);
        Task<Dictionary<long, List<Movie>>> GetStarAllMovies(long id);
        Task<Dictionary<long, List<Movie>>> GetDirectorAllMovies(long id);
    }
}