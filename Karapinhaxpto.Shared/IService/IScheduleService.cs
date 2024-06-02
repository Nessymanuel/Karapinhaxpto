using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IScheduleService
{
    Task<Schedule> GetById(int id);
    Task<List<Schedule>> GetAll();
    Task<bool> Update(ScheduleUpdateDTO scheduleUpdateDTO);
    Task<bool> Create(ScheduleAddDTO scheduleAddDTO);
    Task<bool> Delete(int id);

}
