namespace Backend.DTOs;

public class ResultItemDTO
{
    public long Id {get;set;}
    public string Name { get; set; } = null!;
    public int? Year { get; set; }
    public string Type {get;set;} = null!;
    public double? Rating {get;set;} = null!;
}