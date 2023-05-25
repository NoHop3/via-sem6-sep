using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFavouriteId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReviewText",
                table: "reviews",
                newName: "reviewText");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "favourites",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_favourites",
                table: "favourites",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_favourites",
                table: "favourites");

            migrationBuilder.DropColumn(
                name: "id",
                table: "favourites");

            migrationBuilder.RenameColumn(
                name: "reviewText",
                table: "reviews",
                newName: "ReviewText");
        }
    }
}
