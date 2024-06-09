//using Karapinhaxpto.DTOs;
//using Karapinhaxpto.Shared.IService;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;

//namespace Karapinhaxpto.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IAuthService _authService;

//        public AuthController(IAuthService authService)
//        {
//            _authService = authService;
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login(UserLoginDTO userloginDTO)
//        {
//            var result = await _authService.Login(userloginDTO);

//            if (result.Success)
//            {
//                return Ok(result);
//            }
//            else
//            {
//                return Unauthorized(result);
//            }
//        }
//    }
//}
