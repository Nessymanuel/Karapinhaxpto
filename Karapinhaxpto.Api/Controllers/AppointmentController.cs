using Karapinhaxpto.DTOs;
using Karapinhaxpto.Service;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AppointmentController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;

    public AppointmentController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategory()
    {
        return Ok(await _appointmentService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        return Ok(await _appointmentService.GetById(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        return Ok(await _appointmentService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateCategory(AppointmentAddDTO appointmentAddDTO)
    {
        return Ok(await _appointmentService.Create(appointmentAddDTO));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAppointment(int id, [FromBody] AppointmentUpdateDTO appointmentUpdateDTO)
    {
        if (id != appointmentUpdateDTO.Id)
        {
            return BadRequest("O ID fornecido na URL não coincide com o ID no corpo da solicitação.");
        }

        var result = await _appointmentService.Update(appointmentUpdateDTO);
        if (result)
        {
            return NoContent();
        }

        return NotFound();
    }
}
