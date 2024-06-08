using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service;
public class ScheduleService:IScheduleService
{
    private readonly IScheduleRepository _scheduleRepository;

    public ScheduleService(IScheduleRepository scheduleRepository)
    {
        _scheduleRepository = scheduleRepository;
    }

    public async Task<bool> Create(ScheduleAddDTO scheduleAddDTO)
    {
        var schedule = new Schedule
        {
            Description = scheduleAddDTO.Descripton,
        };
        return await _scheduleRepository.Create(schedule);
    }

    public async Task<bool> Delete(int id)
    {
        var schedule = await _scheduleRepository.GetById(id);
        if (schedule != null)
        {
            return await _scheduleRepository.Delete(schedule);
        }
        return false;
    }

    public async Task<List<Schedule>> GetAll()
    {
        return await _scheduleRepository.GetAll();
    }

    public async Task<Schedule> GetById(int id)
    {
        return await _scheduleRepository.GetById(id);
    }

    public async Task<bool> Update(ScheduleUpdateDTO scheduleUpdateDTO)
    {
        var schedule = await _scheduleRepository.GetById(scheduleUpdateDTO.Id);

        if (schedule != null)
        {
            schedule.Description = scheduleUpdateDTO.Description;
            return await _scheduleRepository.Update(schedule);
        }
        return false;
    }

}
