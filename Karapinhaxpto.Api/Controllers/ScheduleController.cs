using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _scheduleService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSById(int id)
        {
            return Ok(await _scheduleService.GetById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            return Ok(await _scheduleService.Delete(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(ScheduleAddDTO scheduleAddDTO)
        {
            return Ok(await _scheduleService.Create(scheduleAddDTO));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSchedule(ScheduleUpdateDTO scheduleUpdateDTO)
        {
            return Ok(await _scheduleService.Update(scheduleUpdateDTO));
        }
    }
}
