namespace Backend.Models;

public class Favourite
{
    public int UserId { get; set; }
    public long MovieId { get; set; }
    public virtual User User { get; set; } = null!;
    public virtual Movie Movie { get; set; } = null!;
}