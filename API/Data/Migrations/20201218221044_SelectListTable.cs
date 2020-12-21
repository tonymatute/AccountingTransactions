using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class SelectListTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionFrom",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionSubType",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Photo",
                table: "Scout",
                newName: "PhotoUrl");

            migrationBuilder.CreateTable(
                name: "SelectList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListColumn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Display = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectList", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectList");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Scout",
                newName: "Photo");

            migrationBuilder.AddColumn<int>(
                name: "TransactionFrom",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TransactionSubType",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
