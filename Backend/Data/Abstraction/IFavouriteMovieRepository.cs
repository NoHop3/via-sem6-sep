using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IFavouriteMovieRepository
{
    Task<Dictionary<int, List<Movie>>>  GetUserFavouritesByEmailOrUsername(string email);
    Task AddFavourite(Favourite favourite);
    Task DeleteFavourite(Favourite favourite);
}