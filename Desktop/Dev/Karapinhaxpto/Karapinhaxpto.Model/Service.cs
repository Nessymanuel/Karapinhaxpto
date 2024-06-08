using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Model;
public class Service
{
    [Key]
    public int Id { get; set; }
    public string  ? Description { get; set; }
    public double Price { get; set; }
    public int Category_ID { get; set; }
    [ForeignKey(nameof(Category_ID))]
    public Category ? category { get; set; }


}
