using Backend.Data.Abstraction;
using Backend.Models;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;
internal class FavouriteRepository : IFavouriteRepository
{
    private readonly MyDbContext _context;
    public FavouriteRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<Boolean> GetFavourite(int userId, long movieId)
    {
        return await _context.Favourites.AnyAsync(x => x.UserId == userId && x.MovieId == movieId);
    }

    public async Task SetFavourite(Favourite favourite)
    {
        var fav = await _context.Favourites.FirstOrDefaultAsync(x => x.UserId == favourite.UserId && x.MovieId == favourite.MovieId);
        if (fav == null)
        {
            await AddFavourite(favourite);
        }
        else
        {
            await RemoveFavourite(fav);
        }
    }

    public async Task AddFavourite(Favourite favourite)
    {
        await _context.Favourites.AddAsync(favourite);
        await _context.SaveChangesAsync();

    }

    public async Task RemoveFavourite(Favourite favourite)
    {
        _context.Favourites.Remove(favourite);
        await _context.SaveChangesAsync();
    }
}