using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class AddFKtoActivityType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActivityId",
                table: "Transactions",
                newName: "ActivityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ActivityTypeId",
                table: "Transactions",
                column: "ActivityTypeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions",
                column: "ActivityTypeId",
                principalTable: "ActivityTypes",
                principalColumn: "ActivityTypeID",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ActivityTypeId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "ActivityTypeId",
                table: "Transactions",
                newName: "ActivityId");
        }
    }
}
