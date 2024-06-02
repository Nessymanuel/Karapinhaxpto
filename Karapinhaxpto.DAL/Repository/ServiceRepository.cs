using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DAL.Repository;
public class ServiceRepository : GenericRepository<Service>, IServiceRepository
{
    public ServiceRepository(KarapinhaxptoContext context) : base(context)
    {
    }
}
  