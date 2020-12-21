using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class ScoutRemoveRankid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RankId",
                table: "Scout");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RankId",
                table: "Scout",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
