using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

[PrimaryKey(nameof(MovieId), nameof(PersonId))]
public class Director
{
    [Key]
    public int MovieId { get; set; }
    public int PersonId { get; set; }
}
