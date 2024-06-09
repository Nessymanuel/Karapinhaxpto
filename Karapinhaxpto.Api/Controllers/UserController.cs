using Karapinhaxpto.DTOs;
using Karapinhaxpto.Service;
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
        //private readonly IAuthService _authService;

        public UserController(IUserService userService/*, IAuthService authService*/)
        {
            _userService = userService;
            //_authService = authService;
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
        //public async Task<IActionResult> CreateUser([FromForm] UserAddDTO userAddDTO, IFormFile photo)
        //{
        //    if (photo != null)
        //    {
        //        // Salve a foto ou processe conforme necessário
        //    }

        //    var result = await _userService.Create(userAddDTO);
        //    if (!result)
        //    {
        //        return BadRequest("Erro ao criar usuário.");
        //    }

        //    // Envie o e-mail para o administrador, se necessário
        //    return Ok("Usuário registrado com sucesso. Aguardando ativação do administrador.");
        //}


        //[HttpPost("login")]
        //public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        //{
        //    var result = await _authService.Login(userLoginDTO);

        //    if (result.Success)
        //    {
        //        return Ok(result);
        //    }
        //    else
        //    {
        //        return Unauthorized(result);
        //    }
        //}

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            return Ok(await _userService.Update(userUpdateDTO));
        }

        [HttpGet("activate/{id}")]
        public async Task<IActionResult> UserActivate(int id)
        {
            await _userService.UserActivate(id);
            return Ok();
        }
    }
}
