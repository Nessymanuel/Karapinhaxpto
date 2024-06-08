using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Karapinhaxpto.Service;
public class ProfissionalService : IProfissionalService
{

    private readonly IProfissionalRepository _profissionalRepository;
    public ProfissionalService(IProfissionalRepository profissionalRepository)
    {
        _profissionalRepository = profissionalRepository;
    }
  

    public async Task<bool> Create(ProfissionalAddDTO profissionalAddDTO)
    {
        var profissional = new Profissional
        {
            Description = profissionalAddDTO.Description,
            Email = profissionalAddDTO.Email,
            Phone = profissionalAddDTO.Phone,
            Photo = profissionalAddDTO.Photo,
            Id_Card = profissionalAddDTO.Id_Card,
            Category_ID = profissionalAddDTO.Category_ID
    };
        return await _profissionalRepository.Create(profissional);
    }

    public async Task<bool> Delete(int id)
    {
        var profissional = await _profissionalRepository.GetById(id);
        if (profissional != null)
        {
            return await _profissionalRepository.Delete(profissional);
        }
        return false;
    }

    public async Task<List<Profissional>> GetAll()
    {
        return await _profissionalRepository.GetAll();
    }

    public async Task<Profissional> GetById(int id)
    {
        return await _profissionalRepository.GetById(id);
    }

    

    public async Task<bool> Update(ProfissionalUpdateDTO profissionalUpdateDTO)
    {
        var profissional = await _profissionalRepository.GetById(profissionalUpdateDTO.Id);

        if (profissional != null)
        {

            profissional.Description = profissionalUpdateDTO.Description;
            profissional.Phone = profissionalUpdateDTO.Phone;
            profissional.Photo = profissionalUpdateDTO.Photo;
            profissional.Email = profissionalUpdateDTO.Email;
            profissional.Id_Card = profissionalUpdateDTO.Id_Card;
            profissional.Category_ID = profissionalUpdateDTO.Category_ID;

            return await _profissionalRepository.Update(profissional);
        }
        return false;
    }
}
