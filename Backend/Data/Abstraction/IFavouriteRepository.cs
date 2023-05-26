using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IFavouriteRepository
{
    Task<Dictionary<int, List<Movie>>>  GetUserFavouritesByEmailOrUsername(string email);
    Task<Dictionary<int, List<Movie>>> GetUserFavouritesByIdWithLimit(int id, int skip, int limit);
    Task<Boolean> GetFavourite(int userId, long movieId);
    Task SetFavourite(Favourite favourite);
    Task AddFavourite(Favourite favourite);
    Task RemoveFavourite(Favourite favourite);
}