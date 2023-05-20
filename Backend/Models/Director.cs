using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class Director
{
    public long MovieId { get; set; }
    public long PersonId { get; set; }

    public virtual Movie Movie { get; set; } = null!;
    public virtual Person Person { get; set; } = null!;
}
