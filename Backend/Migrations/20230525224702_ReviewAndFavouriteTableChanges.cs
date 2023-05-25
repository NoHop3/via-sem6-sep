using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ReviewAndFavouriteTableChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "reviewText",
                table: "reviews");

            migrationBuilder.AddColumn<int>(
                name: "reviewStars",
                table: "reviews",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "reviewStars",
                table: "reviews");

            migrationBuilder.AddColumn<string>(
                name: "reviewText",
                table: "reviews",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
