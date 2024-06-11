using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DTOs;
public class AuthResultDTO
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public string Token { get; set; }
}