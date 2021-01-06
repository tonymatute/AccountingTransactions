using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class ChangeLeadership : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdultLeadership_Leadership_LeaderShipId",
                table: "AdultLeadership");

            migrationBuilder.RenameColumn(
                name: "LeaderShipId",
                table: "AdultLeadership",
                newName: "LeadershipId");

            migrationBuilder.RenameIndex(
                name: "IX_AdultLeadership_LeaderShipId",
                table: "AdultLeadership",
                newName: "IX_AdultLeadership_LeadershipId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdultLeadership_Leadership_LeadershipId",
                table: "AdultLeadership",
                column: "LeadershipId",
                principalTable: "Leadership",
                principalColumn: "LeadershipId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdultLeadership_Leadership_LeadershipId",
                table: "AdultLeadership");

            migrationBuilder.RenameColumn(
                name: "LeadershipId",
                table: "AdultLeadership",
                newName: "LeaderShipId");

            migrationBuilder.RenameIndex(
                name: "IX_AdultLeadership_LeadershipId",
                table: "AdultLeadership",
                newName: "IX_AdultLeadership_LeaderShipId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdultLeadership_Leadership_LeaderShipId",
                table: "AdultLeadership",
                column: "LeaderShipId",
                principalTable: "Leadership",
                principalColumn: "LeadershipId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
