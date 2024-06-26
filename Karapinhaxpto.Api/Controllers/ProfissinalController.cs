using Karapinhaxpto.DTOs;
using Karapinhaxpto.Service;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProfissionalController: ControllerBase
{

    private readonly IProfissionalService _profissionalService;

    public ProfissionalController(IProfissionalService profissionalService)
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
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfissional(int id, [FromBody] ProfissionalUpdateDTO profissionalUpdateDTO)
    {

        if (id != profissionalUpdateDTO.Id)
        {
            return BadRequest("O ID fornecido na URL não coincide com o ID no corpo da solicitação.");
        }

        var result = await _profissionalService.Update(profissionalUpdateDTO);
        if (result)
        {
            return NoContent();
        }

        return NotFound();
    }

    
    
}
