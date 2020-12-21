using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.MIgrations
{
    public partial class LookupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListColumn",
                table: "SelectList");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "SelectList");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transactions",
                newName: "TransactionTypeId");

            migrationBuilder.AlterColumn<int>(
                name: "CheckNumber",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Display",
                table: "SelectList",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ListType",
                table: "SelectList",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListType",
                table: "SelectList");

            migrationBuilder.RenameColumn(
                name: "TransactionTypeId",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.AlterColumn<int>(
                name: "CheckNumber",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Display",
                table: "SelectList",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ListColumn",
                table: "SelectList",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Value",
                table: "SelectList",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
