using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class UserUpdateDTO
{
    public int Id { get; set; }
    public string ?FullName { get; set; }
    public string ?Password { get; set; }
    public string ?Email { get; set; }
    public string ?Phone { get; set; }
    public string ?Photo { get; set; }
    public string ? ID_Card { get; set; }
    public string ? Username { get; set; }
    public int ? ProfileId { get; set; }
    public bool ? Activate { get; set; }
    public bool ? Status { get; set; }
}
