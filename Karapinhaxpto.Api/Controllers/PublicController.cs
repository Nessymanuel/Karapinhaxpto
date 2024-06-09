namespace Karapinhaxpto.Api.Controllers;

using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class PublicController : ControllerBase
{
    private readonly IServiceService _serviceService;

    public PublicController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpGet("services")]
    public async Task<IActionResult> GetServices()
    {
        var services = await _serviceService.GetAll();
        return Ok(services);
    }

}
