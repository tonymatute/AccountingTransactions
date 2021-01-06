using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.data.migrations
{
    public partial class AddAdultLeadership : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Leadership",
                columns: table => new
                {
                    LeadershipId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Started = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Ended = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leadership", x => x.LeadershipId);
                });

            migrationBuilder.CreateTable(
                name: "AdultLeadership",
                columns: table => new
                {
                    AdultId = table.Column<int>(type: "integer", nullable: false),
                    LeaderShipId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdultLeadership", x => new { x.AdultId, x.LeaderShipId });
                    table.ForeignKey(
                        name: "FK_AdultLeadership_Adult_AdultId",
                        column: x => x.AdultId,
                        principalTable: "Adult",
                        principalColumn: "AdultId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdultLeadership_Leadership_LeaderShipId",
                        column: x => x.LeaderShipId,
                        principalTable: "Leadership",
                        principalColumn: "LeadershipId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdultLeadership_LeaderShipId",
                table: "AdultLeadership",
                column: "LeaderShipId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdultLeadership");

            migrationBuilder.DropTable(
                name: "Leadership");
        }
    }
}
