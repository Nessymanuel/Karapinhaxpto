using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IRepository;
public interface IGenericRepository<T>
{

    Task <T>  GetById(int id);
    Task <bool> Create(T entity);
    Task <bool> Delete(T entity);
    Task <bool> Update(T entity);
    Task <List<T>> GetAll();

}
