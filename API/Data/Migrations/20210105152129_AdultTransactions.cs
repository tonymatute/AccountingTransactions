using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class AdultTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdultId",
                table: "Transactions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AdultId",
                table: "Transactions",
                column: "AdultId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Adult_AdultId",
                table: "Transactions",
                column: "AdultId",
                principalTable: "Adult",
                principalColumn: "AdultId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Adult_AdultId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_AdultId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "AdultId",
                table: "Transactions");
        }
    }
}
