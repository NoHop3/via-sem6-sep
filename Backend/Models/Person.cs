using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public partial class Person
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public int? Birth { get; set; }
}
