using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ServiceUpdateDTO
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int Category_ID { get; set; }

}
