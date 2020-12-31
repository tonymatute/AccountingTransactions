using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class RenameSomeDateFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RankDateTime",
                table: "Ranks",
                newName: "Created");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Ranks",
                newName: "RankDateTime");
        }
    }
}
