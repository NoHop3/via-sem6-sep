using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Person
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Year { get; set; }
}
