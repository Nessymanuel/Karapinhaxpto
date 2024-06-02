using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;

        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public async Task<bool> Create(ServiceAddDTO serviceAddDTO)
        {
            var service = new Model.Service
            {
                Description = serviceAddDTO.Description,
                Price = serviceAddDTO.Price,
                Category_ID = serviceAddDTO.Category_ID
            };
            return await _serviceRepository.Create(service);
        }

        public async Task<bool> Delete(int id)
        {
            var service = await _serviceRepository.GetById(id);
            if (service != null)
            {
                return await _serviceRepository.Delete(service);
            }
            return false;
        }

        public async Task<List<Model.Service>> GetAll()
        {
            return await _serviceRepository.GetAll();
        }

        public async Task<Model.Service> GetById(int id)
        {
            return await _serviceRepository.GetById(id);
        }

        public async Task<bool> Update(ServiceUpdateDTO serviceUpdateDTO)
        {
            var service = await _serviceRepository.GetById(serviceUpdateDTO.Id);

            if (service != null)
            {
                service.Description = serviceUpdateDTO.Description;
                service.Price = serviceUpdateDTO.Price;
                service.Category_ID = serviceUpdateDTO.Category_ID;
                return await _serviceRepository.Update(service);
            }
            return false;
        }
    }
}
