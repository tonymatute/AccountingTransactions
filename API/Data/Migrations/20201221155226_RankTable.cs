using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class RankTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rank",
                table: "Scout",
                newName: "RankId");

            migrationBuilder.CreateTable(
                name: "Ranks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RankId = table.Column<int>(type: "int", nullable: false),
                    RankName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ActiveRank = table.Column<bool>(type: "bit", nullable: false),
                    RankDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ScoutMemberId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ranks_Scout_ScoutMemberId",
                        column: x => x.ScoutMemberId,
                        principalTable: "Scout",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ranks_ScoutMemberId",
                table: "Ranks",
                column: "ScoutMemberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ranks");

            migrationBuilder.RenameColumn(
                name: "RankId",
                table: "Scout",
                newName: "Rank");
        }
    }
}
