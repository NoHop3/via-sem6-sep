using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Movie
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public int Year { get; set; }
}
