using Backend.Data.Abstraction;
using Backend.Models;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;
internal class UserRepository : IUserRepository
{
    private readonly MyDbContext _context;
    public UserRepository(MyDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUserById(int id)
    {
        return await _context.Users.SingleOrDefaultAsync(x => x.Id == id) ?? null;
    }
    public async Task AddUser(User user)
    {
        //Check if the email or username exists already
        var emails = _context.Users.Select(x=>x.Email);
        if(emails.Contains(user.Email)) throw new Exception("This email is already in use.");
        var usernames = _context.Users.Select(x=>x.Username);
        if(usernames.Contains(user.Username)) throw new Exception("This username is already in use.");

        //Gerenate unique value for the user and hash their password
        user.Salt = AuthorizationProvider.GenerateSalt(); 
        user.HashedPasword = AuthorizationProvider.HashPasword(user.HashedPasword, user.Salt);

        //Save the new user
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(x=>x.Email == email);
    }

    public async Task<User> GetUserByUsername(string username)
    {
        return await _context.Users.SingleOrDefaultAsync(x=>x.Username == username);
    }

    public async Task<int> GetUserIdByEmailOrUsername(string emailOrUsername)
    {
        var user = emailOrUsername.Contains("@") ? await _context.Users.FirstAsync(x=>x.Email == emailOrUsername) 
                                                 : await _context.Users.FirstAsync(x=>x.Username == emailOrUsername);

        return user.Id;
    }

    public async Task UpdateUser(User user)
    {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}