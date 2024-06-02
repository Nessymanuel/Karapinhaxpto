using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IProfissionalService
{
    Task<Profissional> GetById(int id);
    Task<List<Profissional>> GetAll();
    Task<bool> Update(ProfissionalUpdateDTO profissionalUpdateDTO );
    Task<bool> Create(ProfissionalAddDTO profissionalAddDTO);
    Task<bool> Delete(int id);
}
