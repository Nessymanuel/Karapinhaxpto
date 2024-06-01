using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Model;
public class ServiceAppointment
{
    [Key]
    public int Id { get; set; }

    public int AppointmentId { get; set; }
    [ForeignKey(nameof(AppointmentId))]
     public Appointment Appointment { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public int CategoryId { get; set; }
    public Category? category { get; set; } 
    public DateTime Date {  get; set; }
    public TimeOnly Time { get; set; }
}
