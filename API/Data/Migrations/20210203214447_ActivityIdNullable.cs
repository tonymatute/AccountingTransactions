using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class ActivityIdNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "ActivityTypeId",
                table: "Transactions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

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

            migrationBuilder.AlterColumn<int>(
                name: "ActivityTypeId",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions",
                column: "ActivityTypeId",
                principalTable: "ActivityTypes",
                principalColumn: "ActivityTypeID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
