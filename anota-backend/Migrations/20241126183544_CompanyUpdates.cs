using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anota_backend.Migrations
{
    /// <inheritdoc />
    public partial class CompanyUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Company",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PathRouteKey",
                table: "Company",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SecondaryColor",
                table: "Company",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "primaryColor",
                table: "Company",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "PathRouteKey",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "SecondaryColor",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "primaryColor",
                table: "Company");
        }
    }
}
