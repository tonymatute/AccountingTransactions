using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class scoutBuck : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuckTransactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionTypeId = table.Column<int>(type: "int", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    TransactionCredit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransactionDebit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransactionDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ScoutMemberId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuckTransactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_BuckTransactions_Scout_ScoutMemberId",
                        column: x => x.ScoutMemberId,
                        principalTable: "Scout",
                        principalColumn: "MemberId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuckTransactions_ScoutMemberId",
                table: "BuckTransactions",
                column: "ScoutMemberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuckTransactions");
        }
    }
}
