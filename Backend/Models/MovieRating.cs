using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public partial class MovieRating
{
    public long MovieId { get; set; }
    public double Rating { get; set; }
    public long Votes { get; set; }

    public virtual Movie Movie { get; set; } = null!;
}
