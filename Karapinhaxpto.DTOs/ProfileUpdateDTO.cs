﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class ProfileUpdateDTO
{
    public int Id { get; set; }
    public required string Description { get; set; }
}
