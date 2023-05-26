using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IFavouriteRepository
{
    Task<Boolean> GetFavourite(int userId, long movieId);
    Task SetFavourite(Favourite favourite);
    Task AddFavourite(Favourite favourite);
    Task RemoveFavourite(Favourite favourite);
}