using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFavouriteIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_favourites_user_id",
                table: "favourites");

            migrationBuilder.CreateIndex(
                name: "IX_favourites_user_id_movie_id",
                table: "favourites",
                columns: new[] { "user_id", "movie_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_favourites_user_id_movie_id",
                table: "favourites");

            migrationBuilder.CreateIndex(
                name: "IX_favourites_user_id",
                table: "favourites",
                column: "user_id");
        }
    }
}
