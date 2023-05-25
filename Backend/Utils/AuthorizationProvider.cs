using System.Security.Cryptography;
using System.Text;
using Backend.Models;

namespace Backend.Utils;
public static class AuthorizationProvider
{
    public static string GenerateSalt()
    {
        var saltBytes = new byte[16];
        using (var rnd = RandomNumberGenerator.Create())
        {
            rnd.GetBytes(saltBytes);
        }
        return Encoding.Unicode.GetString(saltBytes);
    }

    public static string HashPasword(string password, string salt)
    {
        byte[] hashedBytes;
        var passwordSalt = new List<byte>(Encoding.Unicode.GetBytes(password));
        passwordSalt.AddRange(Encoding.Unicode.GetBytes(salt));
        using (var hasher = SHA256.Create())
        {
            hashedBytes = hasher.ComputeHash(passwordSalt.ToArray());
        }
        return Encoding.Unicode.GetString(hashedBytes);
    }

    public static bool VerifyPasword(string passwordInput, User user)
    {
        string hashedInput = HashPasword(passwordInput, user.Salt);
        return hashedInput == user.HashedPasword;
    }

    public static string GenerateAPIKey(string username)
    {
        var salt = GenerateSalt();
        var APIKey = HashPasword(username, salt);
        return APIKey;
    }
}