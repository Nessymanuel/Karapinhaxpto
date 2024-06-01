using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class AppointmentUpdateDTO
{
    public int Id { get; set; }

    public DateTime DateTime { get; set; }

    public double TotalPrice { get; set; }

    public bool Status { get; set; }

    public int UserId { get; set; }
}
