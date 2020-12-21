using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class scoutchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatrolName",
                table: "Scout");

            migrationBuilder.AddColumn<int>(
                name: "PatrolId",
                table: "Scout",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatrolId",
                table: "Scout");

            migrationBuilder.AddColumn<string>(
                name: "PatrolName",
                table: "Scout",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
