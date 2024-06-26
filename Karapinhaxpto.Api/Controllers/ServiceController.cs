using Karapinhaxpto.DTOs;
using Karapinhaxpto.Service;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Karapinhaxpto.Api.Controllers
{
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

        //[HttpGet("category/{categoryId}")]
        //public async Task<IActionResult> GetServiceByCategory(int categoryId)
        //{
        //    var services = await _serviceService.GetByCategory(categoryId);
        //    if (services == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(services);
        //}

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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceUpdateDTO serviceUpdateDTO)
        {
            if (id != serviceUpdateDTO.Id)
            {
                return BadRequest("O ID fornecido na URL não coincide com o ID no corpo da solicitação.");
            }

            var result = await _serviceService.Update(serviceUpdateDTO);
            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}

