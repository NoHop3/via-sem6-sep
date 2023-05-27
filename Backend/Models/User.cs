namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int? BirthYear { get; set; } 
    public string HashedPasword { get; set; } = null!;
    public string Salt { get; set; } = null!;
    public string APIKey { get; set; } = null!;
}

public class LoginUser
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}