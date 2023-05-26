namespace Backend.DTOs;

public partial class PersonMovie
{
    public long PersonId { get; set; }
    public string Title { get; set; } = null!;
    public int? ReleaseYear { get; set; }
    public string Role { get; set; } = null!;
    public double? Rating {get;set;} = null!;
}