using Karapinhaxpto.DTOs;
using Karapinhaxpto.Service;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Karapinhaxpto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;
      


        public UserController(IUserService userService)
        {
            _userService = userService;
            
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await _userService.GetById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            return Ok(await _userService.Delete(id));
        }

        [HttpPost]

        public async Task<IActionResult> CreateUser(UserAddDTO userAddDTO)
        {
           

            return Ok(await _userService.Create(userAddDTO));
        }


      

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            var result = await _userService.Login(userLoginDTO);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return Unauthorized(result);
            }
        }



        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            return Ok(await _userService.Update(userUpdateDTO));
        }

        [HttpGet("activate/{id}")]
        public async Task<IActionResult> UserActivate(int id)
        {
            await _userService.UserActivate(id);
            
            return Ok(new { message = "Conta ativada com sucesso!" });
        }
    }
}
