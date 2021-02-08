using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class modifyTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_TransactionTypes_TransactionTypeId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ActivityTypeId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_TransactionTypeId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ActivityTypeId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionTypeId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionDateTime",
                table: "Transactions",
                newName: "TransactionDate");

            migrationBuilder.AlterColumn<string>(
                name: "CheckNumber",
                table: "Transactions",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ActivityTypeCost",
                table: "Transactions",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActivityTypeLocation",
                table: "Transactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActivityTypeName",
                table: "Transactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransactionTypeName",
                table: "Transactions",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityTypeCost",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ActivityTypeLocation",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ActivityTypeName",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionTypeName",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionDate",
                table: "Transactions",
                newName: "TransactionDateTime");

            migrationBuilder.AlterColumn<int>(
                name: "CheckNumber",
                table: "Transactions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ActivityTypeId",
                table: "Transactions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransactionTypeId",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ActivityTypeId",
                table: "Transactions",
                column: "ActivityTypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TransactionTypeId",
                table: "Transactions",
                column: "TransactionTypeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ActivityTypes_ActivityTypeId",
                table: "Transactions",
                column: "ActivityTypeId",
                principalTable: "ActivityTypes",
                principalColumn: "ActivityTypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_TransactionTypes_TransactionTypeId",
                table: "Transactions",
                column: "TransactionTypeId",
                principalTable: "TransactionTypes",
                principalColumn: "TransactionTypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
