using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karapinhaxpto.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHashToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profissional_Services_Service_ID",
                table: "Profissional");

            migrationBuilder.RenameColumn(
                name: "Service_ID",
                table: "Profissional",
                newName: "Category_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Profissional_Service_ID",
                table: "Profissional",
                newName: "IX_Profissional_Category_ID");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Profissional_Services_Category_ID",
                table: "Profissional",
                column: "Category_ID",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profissional_Services_Category_ID",
                table: "Profissional");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Category_ID",
                table: "Profissional",
                newName: "Service_ID");

            migrationBuilder.RenameIndex(
                name: "IX_Profissional_Category_ID",
                table: "Profissional",
                newName: "IX_Profissional_Service_ID");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Profissional_Services_Service_ID",
                table: "Profissional",
                column: "Service_ID",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
