using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class MyDbContext : DbContext
{
    public DbSet<Movie> Movies { get; set; }

    public DbSet<Person> People { get; set; }
    public DbSet<MovieRating> MovieRatings { get; set; }
    public DbSet<Star> Stars { get; set; }
    public DbSet<Director> Directors { get; set; }
    
    #pragma warning disable CS8618
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Star>().HasKey(s => new { s.MovieId, s.PersonId });
        modelBuilder.Entity<Director>().HasKey(d => new { d.MovieId, d.PersonId });
    }

}
