namespace Backend.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public int? BirthYear { get; set; }
    public string? APIKey { get; set; }
}