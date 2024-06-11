using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Model;
public class User
{
    [Key]
    public int Id { get; set; }
    public string ? FullName { get; set; }
    public string? Password { get; set; } 
    public string PasswordHash { get; set; } /*= string.Empty;*/
    public required string  Email { get; set; }        
    public string ? Phone { get; set; }        
    public string ? Photo { get; set; }
    public string ? ID_Card { get; set; }
    public string ? Username { get; set; }
    public int ? ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public Profile ? Profile { get; set; }
    public bool Activate { get; set; }
    public bool Status { get; set; }


    //public void SetPassword(string password)
    //{
    //    PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
    //}






}
