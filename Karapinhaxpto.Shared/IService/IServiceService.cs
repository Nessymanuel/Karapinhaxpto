using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IServiceService
{
    Task<Service> GetById(int id);
    Task<List<Service>> GetAll();
    Task<bool> Update(ServiceUpdateDTO serviceUpdateDTO);
    Task<bool> Create(ServiceAddDTO serviceAddDTO);
    Task<bool> Delete(int id);
    //Task <Service> GetByCategory(int categoryId);
}
