using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Karapinhaxpto.Model;
public class Appointment
{
    [Key]
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public double Total_Price { get; set; }
    public bool Status { get; set;}
    [ForeignKey (nameof(User_ID))]
    public int  User_ID { get; set; }
    public User ? user { get; set;}

}



