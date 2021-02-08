using Microsoft.EntityFrameworkCore.Migrations;

namespace API.data.migrations
{
    public partial class renameActivitytypeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActivityTypeID",
                table: "ActivityTypes",
                newName: "ActivityTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActivityTypeId",
                table: "ActivityTypes",
                newName: "ActivityTypeID");
        }
    }
}
