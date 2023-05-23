using Backend.Data.Abstraction;
using Backend.Models;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;
internal class FavouriteMovieRepository : IFavouriteMovieRepository
{
    private readonly MyDbContext _context;
    public FavouriteMovieRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task AddFavourite(Favourite favourite)
    {
        await _context.Favourites.AddAsync(favourite);
        await _context.SaveChangesAsync();

    }

    public async Task DeleteFavourite(Favourite favourite)
    {
        _context.Favourites.Remove(favourite);
        await _context.SaveChangesAsync();
    }

    public async Task<Dictionary<int, List<Movie>>> GetUserFavouritesByEmailOrUsername(string emailOrUsername)
    {
        var user = emailOrUsername.Contains("@") ? await _context.Users.FirstAsync(x=>x.Email == emailOrUsername) 
                                                 : await _context.Users.FirstAsync(x=>x.Username == emailOrUsername);
        var favourites = await _context.Favourites.Include(x=>x.Movie).Where(x=>x.UserId == user.Id).ToListAsync(); 

        var result = favourites.GroupBy(x=>x.UserId).ToDictionary(user=>user.Key, user=>user.Select(x=>x.Movie).ToList());
        return result;

    }
}