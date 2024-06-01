using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Karapinhaxpto.Model;
public class Profissional
{
    [Key]
    public int Id { get; set; }
    public string Description { get; set; }
    public int Service_ID { get; set; }
    [ForeignKey(nameof(Service_ID))]
    public Service service { get; set; }
    public string Email { get; set; }
    public string Photo { get; set; }
    public string Phone { get; set; }
    public string Id_Card { get; set; }



   
}
