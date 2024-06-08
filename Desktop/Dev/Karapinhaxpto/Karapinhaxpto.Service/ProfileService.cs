using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service;
public class ProfileService : IProfileService
{

    private readonly IProfileRepository _profileRepository;

    public ProfileService(IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }
    public async Task<bool> Create(ProfileAddDTO profileAddDTO)
    {
        var profile = new Profile
        {
            Description = profileAddDTO.Descripton,
        };
        return await _profileRepository.Create(profile);
        
    }

   

    public async Task<bool> Delete(int id)
    {
        var profile = await _profileRepository.GetById(id);
        if(profile != null) {
            return await _profileRepository.Delete(profile);
        }
        return false;
    }

    public async Task<List<Profile>> GetAll()
    {
        return await _profileRepository.GetAll();
    }

    public async Task<Profile> GetById(int id)
    {
        return await _profileRepository.GetById(id);
    }

    public async Task<bool> Update(ProfileUpdateDTO profileUpdateDTO)
    {
        var profile = await _profileRepository.GetById(profileUpdateDTO.Id);

        if (profile != null)
        {
            profile.Description = profileUpdateDTO.Description;
            return await _profileRepository.Update(profile);
        }
        return false;
    }
}
