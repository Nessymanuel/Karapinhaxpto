using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Karapinhaxpto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceAppointmentController : ControllerBase
    {
        private readonly IServiceAppointmentService _serviceAppointmentService;

        public ServiceAppointmentController(IServiceAppointmentService serviceAppointmentService)
        {
            _serviceAppointmentService = serviceAppointmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetServiceAppointments()
        {
            return Ok(await _serviceAppointmentService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceAppointmentById(int id)
        {
            return Ok(await _serviceAppointmentService.GetById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceAppointment(int id)
        {
            return Ok(await _serviceAppointmentService.Delete(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateServiceAppointment(ServiceAppointmentAddDTO serviceAppointmentAddDTO)
        {
            return Ok(await _serviceAppointmentService.Create(serviceAppointmentAddDTO));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateServiceAppointment(ServiceAppointmentUpdateDTO serviceAppointmentUpdateDTO)
        {
            return Ok(await _serviceAppointmentService.Update(serviceAppointmentUpdateDTO));
        }
    }
}
