using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProfissinalController: ControllerBase
{

    private readonly IProfissionalService _profissionalService;

    public ProfissinalController(IProfissionalService profissionalService)
    {
        _profissionalService = profissionalService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfissional()
    {
        return Ok(await _profissionalService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfissionalById(int id)
    {
        return Ok(await _profissionalService.GetById(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfissional(int id)
    {
        return Ok(await _profissionalService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateProfissional(ProfissionalAddDTO profissionalAddDTO)
    {
        return Ok(await _profissionalService.Create(profissionalAddDTO));
    }
    [HttpPut]
    public async Task<IActionResult> UpdateProfissional(ProfissionalUpdateDTO profissionalUpdateDTO)
    {
        return Ok(await _profissionalService.Update(profissionalUpdateDTO));
    }
}
