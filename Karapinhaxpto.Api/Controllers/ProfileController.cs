using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        return Ok(await _profileService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfileById(int id)
    {
        return Ok(await _profileService.GetById(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProfile(int id)
    {
        return Ok(await _profileService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateProfile(ProfileAddDTO profileAddDTO)
    {
        return Ok(await _profileService.Create(profileAddDTO));
    }
    [HttpPut]
    public async Task<IActionResult> UpdateProfile(ProfileUpdateDTO profileUpdateDTO)
    {
        return Ok(await _profileService.Update(profileUpdateDTO));
    }
}
