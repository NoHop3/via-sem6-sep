using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class MovieRating
{
    [Key]
    public int MovieId { get; set; }
    public float Rating { get; set; }
    public int Votes { get; set; }
}
