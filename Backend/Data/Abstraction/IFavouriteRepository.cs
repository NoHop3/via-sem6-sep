using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IFavouriteRepository
{
    Task<Boolean> GetFavourite(int userId, long movieId);
    Task SetFavourite(Favourite favourite);
    Task<Dictionary<int, List<Movie>>>  GetUserFavouritesByEmailOrUsername(string email);
    Task<List<Movie>> GetUserFavouritesByIdWithLimit(int id, int skip, int limit);
    Task AddFavourite(Favourite favourite);
    Task RemoveFavourite(Favourite favourite);
}