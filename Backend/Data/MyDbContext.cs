using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class MyDbContext : DbContext
{
    public DbSet<Movie> Movies { get; set; }

    public DbSet<Person> People { get; set; }
    public DbSet<MovieRating> Ratings { get; set; }
    public DbSet<Star> Stars { get; set; }
    public DbSet<Director> Directors { get; set; }
    public  DbSet<User> Users {get;set;}
    public DbSet<Favourite> Favourites {get; set;}
    public DbSet<Review> Reviews {get;set;}

#pragma warning disable CS8618
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("reviews");

            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

            entity.Property(e => e.MovieId).HasColumnName("movie_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ReviewText).HasColumnName("reviewText");

            entity.HasOne(d => d.Movie)
                .WithMany()
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Favourite>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("favourites");   

            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.MovieId).HasColumnName("movie_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Movie)
                .WithMany()
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("users");

            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Username).IsUnique();

            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Username).HasColumnName("username");
            entity.Property(e => e.FirstName).HasColumnName("firstName");
            entity.Property(e => e.LastName).HasColumnName("lastName");
            entity.Property(e => e.Salt).HasColumnName("salt");
            entity.Property(e => e.HashedPasword).HasColumnName("hashedPasword");
            entity.Property(e => e.BirthYear).HasColumnName("birthYear");
            entity.Property(e=> e.APIKey).HasColumnName("apiKey");
        });

        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasNoKey();

            entity.ToTable("directors");

            entity.Property(e => e.MovieId).HasColumnName("movie_id");

            entity.Property(e => e.PersonId).HasColumnName("person_id");

            entity.HasOne(d => d.Movie)
                .WithMany()
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Person)
                .WithMany()
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.ToTable("movies");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");

            entity.Property(e => e.Title).HasColumnName("title");

            entity.Property(e => e.Year)
                .HasColumnType("NUMERIC")
                .HasColumnName("year");
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.ToTable("people");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");

            entity.Property(e => e.Birth)
                .HasColumnType("NUMERIC")
                .HasColumnName("birth");

            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<MovieRating>(entity =>
        {
            entity.HasNoKey();

            entity.ToTable("ratings");

            entity.Property(e => e.MovieId).HasColumnName("movie_id");

            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.Property(e => e.Votes).HasColumnName("votes");

            entity.HasOne(d => d.Movie)
                .WithMany()
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Star>(entity =>
        {
            entity.HasNoKey();

            entity.ToTable("stars");

            entity.Property(e => e.MovieId).HasColumnName("movie_id");

            entity.Property(e => e.PersonId).HasColumnName("person_id");

            entity.HasOne(d => d.Movie)
                .WithMany()
                .HasForeignKey(d => d.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Person)
                .WithMany()
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });
    }
}
