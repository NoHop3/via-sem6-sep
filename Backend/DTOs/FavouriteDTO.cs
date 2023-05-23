namespace Backend.DTOs;

public class FavouriteDTO
{
    public string UserEmailOrUsername { get; set; } = null!;
    public long MovieId { get; set; }
}