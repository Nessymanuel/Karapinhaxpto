using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ServiceAppointmentAddDTO
{
    public int AppointmentId { get; set; }
    public int CategoryId { get; set; }
    public DateTime Date { get; set; }
    public String Time { get; set; }
}
