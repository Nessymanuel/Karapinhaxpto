


using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service;
public class AuthServiceResponse
{
    public bool Success { get; set; }
    public string Token { get; set; }
    public string ErrorMessage { get; set; }
}
