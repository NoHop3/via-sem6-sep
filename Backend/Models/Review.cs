namespace Backend.Models;

public class Review
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Username {get ;set; } = null!;
    public long MovieId { get; set; }
    public string ReviewText { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public virtual Movie Movie { get; set; } = null!;
}