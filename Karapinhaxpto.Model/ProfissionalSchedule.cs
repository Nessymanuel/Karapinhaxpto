using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Model;
public class ProfissionalSchedule
{
    [Key]
    public int Id {  get; set; }      
    
    [ForeignKey(nameof(ProfissionalId))]
    public int ProfissionalId { get; set; }
    public Profissional? Profissional { get; set; }
    public int ScheduleId { get; set; }

    [ForeignKey(nameof(ScheduleId))]
    public Schedule? schedule { get; set; }
}
