﻿// <auto-generated />
using System;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MoviesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.5");

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Director", b =>
                {
                    b.Property<long>("MovieId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("movie_id");

                    b.Property<long>("PersonId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("person_id");

                    b.HasIndex("MovieId");

                    b.HasIndex("PersonId");

                    b.ToTable("directors", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Favourite", b =>
                {
                    b.Property<long>("MovieId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("movie_id");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("user_id");

                    b.HasIndex("MovieId");

                    b.HasIndex("UserId");

                    b.ToTable("favourites", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Movie", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("title");

                    b.Property<byte[]>("Year")
                        .HasColumnType("NUMERIC")
                        .HasColumnName("year");

                    b.HasKey("Id");

                    b.ToTable("movies", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Person", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<byte[]>("Birth")
                        .HasColumnType("NUMERIC")
                        .HasColumnName("birth");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("people", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Rating", b =>
                {
                    b.Property<long>("MovieId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("movie_id");

                    b.Property<double>("Rating1")
                        .HasColumnType("REAL")
                        .HasColumnName("rating");

                    b.Property<long>("Votes")
                        .HasColumnType("INTEGER")
                        .HasColumnName("votes");

                    b.HasIndex("MovieId");

                    b.ToTable("ratings", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<long>("MovieId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("movie_id");

                    b.Property<string>("ReviewText")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.HasIndex("UserId");

                    b.ToTable("reviews", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Star", b =>
                {
                    b.Property<long>("MovieId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("movie_id");

                    b.Property<long>("PersonId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("person_id");

                    b.HasIndex("MovieId");

                    b.HasIndex("PersonId");

                    b.ToTable("stars", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("APIKey")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("apiKey");

                    b.Property<int?>("BirthYear")
                        .HasColumnType("INTEGER")
                        .HasColumnName("birthYear");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("firstName");

                    b.Property<string>("HashedPasword")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("hashedPasword");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("lastName");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("salt");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Director", b =>
                {
                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Favourite", b =>
                {
                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Rating", b =>
                {
                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Review", b =>
                {
                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EFCoreMigrationsDBFirstTutorial.Models.Star", b =>
                {
                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("EFCoreMigrationsDBFirstTutorial.Models.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("Person");
                });
#pragma warning restore 612, 618
        }
    }
}
