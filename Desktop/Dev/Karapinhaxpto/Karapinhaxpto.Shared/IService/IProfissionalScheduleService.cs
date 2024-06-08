using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IProfissionalScheduleService
{
    Task<bool> Create(ProfissionalScheduleAddDTO profissionalScheduleAddDTO);
    Task<ProfissionalSchedule> GetById(int id);
    Task<List<ProfissionalSchedule>> GetAll();
    Task<bool> Update(ProfissionalScheduleUpdateDTO profissionalScheduleUpdateDTO);
    Task<bool> Delete(int id);

}
