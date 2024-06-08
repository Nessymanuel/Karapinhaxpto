using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ServiceAppointmentUpdateDTO
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public int CategoryId { get; set; }
    public DateTime Date { get; set; }
    public TimeOnly Time { get; set; }
}
