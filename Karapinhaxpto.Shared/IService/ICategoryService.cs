
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface  ICategoryService
{

    Task<Category> GetById(int id);
    Task<List<Category>> GetAll();
    Task<bool> Update(CategoryUpdateDTO categoryUpdateDTOs);
    Task<bool> Create(CategoryAddDTO categoryAddDTO);
    Task<bool> Delete(int id);
}
