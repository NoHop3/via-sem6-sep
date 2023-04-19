using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

[PrimaryKey(nameof(MovieId), nameof(PersonId))]
public class Star
{
    public int MovieId { get; set; }
    public int PersonId { get; set; }
}
