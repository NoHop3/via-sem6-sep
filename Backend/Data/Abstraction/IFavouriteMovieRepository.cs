using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IFavouriteMovieRepository
{
    Task<Dictionary<int, List<Movie>>>  GetUserFavouritesByEmailOrUsername(string email);
    Task<Dictionary<int, List<Movie>>> GetUserFavouritesByIdWithLimit(int id, int skip, int limit);
    Task AddFavourite(Favourite favourite);
    Task RemoveFavourite(Favourite favourite);
}