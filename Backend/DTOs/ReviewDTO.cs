namespace Backend.DTOs;

public class ReviewDTO
{
    public int Id {get;set;}
    public int UserId { get; set; }
    public string Username { get; set; } = null!;
    public long MovieId { get; set; }
    public string ReviewText {get;set;} = null!;
}