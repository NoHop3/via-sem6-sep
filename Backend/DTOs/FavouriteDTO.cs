namespace Backend.DTOs;

public class FavouriteDTO
{
    public int Id {get;set;}
    public string UserEmailOrUsername { get; set; } = null!;
    public long MovieId { get; set; }
}