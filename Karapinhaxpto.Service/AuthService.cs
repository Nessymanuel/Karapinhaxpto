//using Karapinhaxpto.DTOs;
//using Karapinhaxpto.Shared.IRepository;
//using Karapinhaxpto.Shared.IService;
//using System.Threading.Tasks;

//namespace Karapinhaxpto.Service
//{
//    public class AuthService : IAuthService
//    {
//        private readonly IUserRepository _userRepository;

//        public AuthService(IUserRepository userRepository)
//        {
//            _userRepository = userRepository;
//        }

//        public async Task<AuthResultDTO> Login(UserLoginDTO userLoginDTO)
//        {

//            var user = await _userRepository.(userLoginDTO );

//            if (userLoginDTO.Username == "nessymanuel" && userLoginDTO.Password == "12345678")
//            {
//                return new AuthResultDTO { Success = true, Message = "Autenticação bem-sucedida" };
//            }
//            else
//            {
//                return new AuthResultDTO { Success = false, Message = "Autenticação mal-sucedida" };

//            }
            
//        }


//        public Task Logout()
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
