﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karapinhaxpto.DAL.Migrations
{
    /// <inheritdoc />
    public partial class modificacaodatabelaprofissional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Profissional",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Profissional",
                newName: "Description");
        }
    }
}
