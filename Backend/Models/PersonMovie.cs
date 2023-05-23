namespace Backend.Models;

public partial class PersonMovie
{
    public long PersonId { get; set; }
    public string Title { get; set; } = "";
    public int? ReleaseYear { get; set; }
    public string Role { get; set; } = "";
}