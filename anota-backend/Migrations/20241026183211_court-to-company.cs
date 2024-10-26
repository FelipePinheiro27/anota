using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anota_backend.Migrations
{
    /// <inheritdoc />
    public partial class courttocompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Court_Company_id",
                table: "Court",
                column: "Company_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Court_Company_Company_id",
                table: "Court",
                column: "Company_id",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Court_Company_Company_id",
                table: "Court");

            migrationBuilder.DropIndex(
                name: "IX_Court_Company_id",
                table: "Court");
        }
    }
}
