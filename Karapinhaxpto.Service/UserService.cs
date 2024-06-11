using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Karapinhaxpto.Service;
public class UserService : IUserService
{

    private readonly IUserRepository _userRepository;
    private readonly IEmailService _emailService;

    public UserService(IUserRepository userRepository, IEmailService emailService)
    {
        _userRepository = userRepository;
        _emailService = emailService;
    }




    public async Task<bool> Create(UserAddDTO userAddDTO)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(userAddDTO.Password);

        var user = new User
        {
            FullName = userAddDTO.FullName,
            Password = userAddDTO.Password,
            PasswordHash = passwordHash,
            Phone = userAddDTO.Phone,
            Photo = userAddDTO.Photo,
            ID_Card = userAddDTO.ID_Card,
            Username = userAddDTO.Username,
            Email = userAddDTO.Email,
            Activate = false,
            Status = true,
            ProfileId = userAddDTO.ProfileId,
            
        };
        if (user.Password.Length < 8)
        {
            throw new Exception("Digite uma senha com pelo menos 8 caracteres.");
        }

        // Verificar o formato do email
        if (!IsValidEmail(user.Email))
        {
            throw new Exception("O formato do email é inválido.");
        }

        //// Verificar o formato do número de BI
        if (!IsValidIDCard(user.ID_Card))
        {
            throw new Exception("O número de BI é inválido. Deve estar no padrão angolano.");
        }

        var exist = await _userRepository.GetByEmail(user.Email);
        if (exist != null)
        {
            throw new Exception("Digite um outro email.");
        }
        var pass = userAddDTO.Password.Length;
        if (pass < 7)
        {
            throw new Exception("Digite uma passeword com pelo menos 8 caracteres.");
        }



        // Envio de email de ativação
        var activationLink = $"https://localhost:7104/api/User/activate/{user.Id}";
        await _emailService.SendEmail(user.Email, "Assunto: Ativação de Conta \n", $"Clique no link para ativar sua conta: {activationLink}");
        return await _userRepository.Create(user);
    }

    public async Task<bool> Delete(int id)
    {
        var user = await _userRepository.GetById(id);
        if (user != null)
        {
            return await _userRepository.Delete(user);
        }
        return false;
    }

    public async Task<List<User>> GetAll()
    {
        return await _userRepository.GetAll();
    }

    public async Task<User> GetById(int id)
    {
        return await _userRepository.GetById(id);
    }

    public async Task<bool> Update(UserUpdateDTO userUpdateDTO)
    {
        var user = await _userRepository.GetById(userUpdateDTO.Id);

        if (user != null)
        {
           
            user.FullName = userUpdateDTO.FullName;
            user.Password = userUpdateDTO.Password;
            user.Phone = userUpdateDTO.Phone;
            user.Photo = userUpdateDTO.Photo;
            user.ID_Card = userUpdateDTO.ID_Card;
            user.Username = userUpdateDTO.Username;
            user.Email = userUpdateDTO.Email;
            user.Activate = (bool)userUpdateDTO.Activate;
            user.Status = (bool)userUpdateDTO.Status;

            if (user.Password.Length < 8)
            {
                throw new Exception("Digite uma senha com pelo menos 8 caracteres.");
            }

            // Verificar o formato do email
            if (!IsValidEmail(user.Email))
            {
                throw new Exception("O formato do email é inválido.");
            }

            // Verificar o formato do número de BI
            if (!IsValidIDCard(user.ID_Card))
            {
                throw new Exception("O número de BI é inválido. Deve estar no padrão angolano.");
            }

            var exist = await _userRepository.GetByEmail(user.Email);
            if (exist != null)
            {
                throw new Exception("Digite um outro email.");
            }
            var pass = user
                .Password.Length;
            if (pass < 7)
            {
                throw new Exception("Digite uma passeword com pelo menos 8 caracteres.");
            }



            return await _userRepository.Update(user);
        }
        return false;
    }

    public async Task UserActivate(int id)
    {
        var user = await _userRepository.GetById(id);
        if (user != null)
        {
            user.Activate = true;
            await _userRepository.Update(user);
        } 
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    private bool IsValidIDCard(string idCard)
    {
        return idCard.Length == 14 ;
        //return idCard.Length == 14 && idCard.All(char.IsDigit);
    }

    

    public async Task<AuthResultDTO> Login(UserLoginDTO userLoginDTO)
    {

        var user = await _userRepository.GetByEmail(userLoginDTO.Email);
        //!BCrypt.Net.BCrypt.Verify(userLoginDTO.Password, user.Password)
        if (user == null || user.Password != userLoginDTO.Password)
        {
            return new AuthResultDTO
            {
                Success = false,
                Message = "Credencial inválida."
            };
        }

      
        string token = "YCARG";

        return new AuthResultDTO
        {
            Success = true,
            Token = token
        };
    }


}


