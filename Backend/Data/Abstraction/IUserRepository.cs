using Backend.Models;

namespace Backend.Data.Abstraction;
public interface IUserRepository
{
    Task<User?> GetUserById(int id);
    Task<User?> GetUserByEmail(string email);
    Task<User?> GetUserByUsername(string username);
    Task<int> GetUserIdByEmailOrUsername(string emailOrUsername);
    Task AddUser(User user);
    Task UpdateUser(User user);
    Task DeleteUser(User user);
}