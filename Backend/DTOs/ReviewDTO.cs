namespace Backend.DTOs;

public class ReviewDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public long MovieId { get; set; }
    public int ReviewStars { get; set; }
}