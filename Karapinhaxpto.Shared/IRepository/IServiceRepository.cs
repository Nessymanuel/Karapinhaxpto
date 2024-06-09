using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IRepository;
public interface IServiceRepository : IGenericRepository<Service>
{
    //Task<Service> GetByCategory(int id);
}
