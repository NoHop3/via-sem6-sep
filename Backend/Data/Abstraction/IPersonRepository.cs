using Backend.Models;

namespace Backend.Data.Abstraction
{
    public interface IPersonRepository
    {
        Task<IList<Person>> GetAllStars();
        Task<IList<Person>> GetAllStarsLimit(int skip, int limit);
        Task<IList<Person>> GetAllDirectors();
        Task<IList<Person>> GetAllDirectorsLimit(int skip, int limit);

        Task<IList<Person>> GetPeopleLimit(int skip, int limit);

        Task<int> GetStarsCount();
        Task<int> GetDirectorsCount();
        Task<int> GetPeopleCount();
        Task<Person> GetStarOrDirectorById(long id);
        Task<Dictionary<long, List<Movie>>> GetStarAllMovies(long id);
        Task<Dictionary<long, List<Movie>>> GetDirectorAllMovies(long id);

        Task<IList<PersonMovie>> GetPersonMovies(long id);
    }
}