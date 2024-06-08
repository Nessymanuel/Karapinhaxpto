﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ProfissionalAddDTO
{
    public int Id { get; set; }
    public string ? Description { get; set; }
    public int Category_ID { get; set; }
    public string ? Email { get; set; }
    public string ? Photo { get; set; }
    public string ? Phone { get; set; }
    public string ? Id_Card { get; set; }
}
