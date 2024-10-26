using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anota_backend.Migrations
{
    /// <inheritdoc />
    public partial class blockdataremovecompanymodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Block_Company_Company_id",
                table: "Block");

            migrationBuilder.DropIndex(
                name: "IX_Block_Company_id",
                table: "Block");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Block_Company_id",
                table: "Block",
                column: "Company_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Block_Company_Company_id",
                table: "Block",
                column: "Company_id",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
