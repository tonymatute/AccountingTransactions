using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.data.migrations
{
    public partial class AddScoutRanks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ranks_Scout_ScoutMemberId",
                table: "Ranks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ranks",
                table: "Ranks");

            migrationBuilder.DropIndex(
                name: "IX_Ranks_ScoutMemberId",
                table: "Ranks");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Ranks");

            migrationBuilder.DropColumn(
                name: "ActiveRank",
                table: "Ranks");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Ranks");

            migrationBuilder.DropColumn(
                name: "ScoutMemberId",
                table: "Ranks");

            migrationBuilder.AlterColumn<int>(
                name: "RankId",
                table: "Ranks",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ranks",
                table: "Ranks",
                column: "RankId");

            migrationBuilder.CreateTable(
                name: "ScoutRanks",
                columns: table => new
                {
                    ScoutId = table.Column<int>(type: "integer", nullable: false),
                    RankId = table.Column<int>(type: "integer", nullable: false),
                    RankName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ActiveRank = table.Column<bool>(type: "boolean", nullable: false),
                    CompletedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScoutRanks", x => new { x.ScoutId, x.RankId });
                    table.ForeignKey(
                        name: "FK_ScoutRanks_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "RankId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScoutRanks_Scout_ScoutId",
                        column: x => x.ScoutId,
                        principalTable: "Scout",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScoutRanks_RankId",
                table: "ScoutRanks",
                column: "RankId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScoutRanks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ranks",
                table: "Ranks");

            migrationBuilder.AlterColumn<int>(
                name: "RankId",
                table: "Ranks",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Ranks",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<bool>(
                name: "ActiveRank",
                table: "Ranks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Ranks",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ScoutMemberId",
                table: "Ranks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ranks",
                table: "Ranks",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Ranks_ScoutMemberId",
                table: "Ranks",
                column: "ScoutMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ranks_Scout_ScoutMemberId",
                table: "Ranks",
                column: "ScoutMemberId",
                principalTable: "Scout",
                principalColumn: "MemberId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
