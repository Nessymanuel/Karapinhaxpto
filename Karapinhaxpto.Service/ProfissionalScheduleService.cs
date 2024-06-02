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
public class ProfissionalScheduleService : IProfissionalScheduleService
{
    private readonly IProfissionalScheduleRepository _profissionalScheduleRepository;

    public ProfissionalScheduleService(IProfissionalScheduleRepository profissionalScheduleRepository)
    {
        _profissionalScheduleRepository = profissionalScheduleRepository;
    }


    public async Task<bool> Create(ProfissionalScheduleAddDTO profissionalScheduleAddDTO)
    {
        var profissionalSchedule = new ProfissionalSchedule
        {
            ProfissionalId = profissionalScheduleAddDTO.ProfessionalId,
            ScheduleId = profissionalScheduleAddDTO.ScheduleId
        };
        return await _profissionalScheduleRepository.Create(profissionalSchedule);
    }

    public async Task<bool> Delete(int id)
    {
        var profissionalSchedule = await _profissionalScheduleRepository.GetById(id);
        if (profissionalSchedule != null)
        {
            return await _profissionalScheduleRepository.Delete(profissionalSchedule);
        }
        return false;
    }


    public async Task<List<ProfissionalSchedule>> GetAll()
    {
        return await _profissionalScheduleRepository.GetAll();
    }

    public async Task<ProfissionalSchedule> GetById(int id)
    {
        return await _profissionalScheduleRepository.GetById(id);
    }

    public async Task<bool> Update(ProfissionalScheduleUpdateDTO profissionalScheduleUpdateDTO)
    {
        var profissionalSchedule = await _profissionalScheduleRepository.GetById(profissionalScheduleUpdateDTO.Id);

        if (profissionalSchedule != null)
        {
            profissionalSchedule.ProfissionalId = profissionalScheduleUpdateDTO.ProfessionalId;
            profissionalSchedule.ScheduleId = profissionalScheduleUpdateDTO.ScheduleId;
            return await _profissionalScheduleRepository.Update(profissionalSchedule);
        }
        return false;
    }
}

  

    
   

   

   

    

    

