using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ProfissionalUpdateDTO {
    public int Id { get; set; }
    public string Name { get; set; }
    public int  Service_ID { get; set; }
    public string Email { get; set; }
    public string Photo { get; set; }
    public string Phone { get; set; }
    public string Id_Card { get; set; }
}
