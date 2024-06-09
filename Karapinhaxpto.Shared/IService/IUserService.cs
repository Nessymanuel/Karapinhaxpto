using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IUserService
{
    Task<User> GetById(int id);
    Task<List<User>> GetAll();
    Task<bool> Update(UserUpdateDTO userUpdateDTO);
    Task<bool> Create(UserAddDTO userAddDTO);
    Task<bool> Delete(int id);
    Task UserActivate(int id);
}
