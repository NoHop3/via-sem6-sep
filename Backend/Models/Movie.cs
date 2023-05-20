using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public partial class Movie
{
    public long Id { get; set; }
    public string Title { get; set; } = null!;
    public int? Year { get; set; }
}