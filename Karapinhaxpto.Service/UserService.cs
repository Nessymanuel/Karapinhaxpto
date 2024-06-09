using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
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


        var user = new User
        {
            FullName = userAddDTO.FullName,
            Password = userAddDTO.Password,
            Phone = userAddDTO.Phone,
            Photo = userAddDTO.Photo,
            ID_Card = userAddDTO.ID_Card,
            Username = userAddDTO.Username,
            Email = userAddDTO.Email,
            Activate = (bool)userAddDTO.Activate,
            Status = true,
            ProfileId = userAddDTO.ProfileId,
            
        };
        

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
            user.ProfileId = userUpdateDTO.ProfileId;
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
}
