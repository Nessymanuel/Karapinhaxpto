


using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ServiceController : ControllerBase
{
    private readonly IServiceService _serviceService;

    public ServiceController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetService()
    {
        return Ok(await _serviceService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetServiceById(int id)
    {
        return Ok(await _serviceService.GetById(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        return Ok(await _serviceService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateService(ServiceAddDTO serviceAddDTO)
    {
        return Ok(await _serviceService.Create(serviceAddDTO));
    }
    [HttpPut]
    public async Task<IActionResult> UpdateService(ServiceUpdateDTO serviceUpdateDTO)
    {
        return Ok(await _serviceService.Update(serviceUpdateDTO));
    }
}
