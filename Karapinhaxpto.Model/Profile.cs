using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Model;
public class Profile
{
    [Key]
    public  int Id { get; set; }
    public int Description { get; set; }
}
