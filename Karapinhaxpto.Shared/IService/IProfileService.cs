using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IProfileService
{
    Task<Profile> GetById(int id);
    Task<List<Profile>> GetAll();
    Task<bool> Update(ProfileUpdateDTO profileUpdateDTOs);
    Task<bool> Create(ProfileAddDTO profileAddDTO);
    Task<bool> Delete(int id);
}
