using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfissionalScheduleController: ControllerBase
{
    private readonly IProfissionalScheduleService _profissionalScheduleService;

    public ProfissionalScheduleController(IProfissionalScheduleService profissionalScheduleService)
    {
        _profissionalScheduleService = profissionalScheduleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfissionalSchedule()
    {
        return Ok(await _profissionalScheduleService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetprofissionalScheduleById(int id)
    {
        return Ok(await _profissionalScheduleService.GetById(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfissionalSchedule(int id)
    {
        return Ok(await _profissionalScheduleService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateProfile(ProfissionalScheduleAddDTO profissionalScheduleAddDTO)
    {
        return Ok(await _profissionalScheduleService.Create(profissionalScheduleAddDTO));
    }
    [HttpPut]
    public async Task<IActionResult> UpdateProfile(ProfissionalScheduleUpdateDTO profissionalScheduleUpdateDTO)
    {
        return Ok(await _profissionalScheduleService.Update(profissionalScheduleUpdateDTO));
    }

}
