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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Karapinhaxpto.Service;
public class ServiceAppointmentService : IServiceAppointmentService
{

    private readonly IServiceAppointmentRepository _serviceAppointmentRepository;

    public ServiceAppointmentService(IServiceAppointmentRepository serviceAppointmentRepository)
    {
        _serviceAppointmentRepository = serviceAppointmentRepository;
    }
    public async Task<bool> Create(ServiceAppointmentAddDTO serviceAppointmentAddDTO)
    {

        var serviceAppointment = new ServiceAppointment
        {
            AppointmentId = serviceAppointmentAddDTO.AppointmentId,
            CategoryId = serviceAppointmentAddDTO.CategoryId,
            Date = serviceAppointmentAddDTO.Date,
            Time = serviceAppointmentAddDTO.Time,
    };
        return await _serviceAppointmentRepository.Create(serviceAppointment);
    }

    public async Task<bool> Delete(int id)
    {
        var serviceAppointment = await _serviceAppointmentRepository.GetById(id);
        if (serviceAppointment != null)
        {
            return await _serviceAppointmentRepository.Delete(serviceAppointment);
        }
        return false;
    }

    public async Task<List<ServiceAppointment>> GetAll()
    {
        return await _serviceAppointmentRepository.GetAll();
    }

    public async Task<ServiceAppointment> GetById(int id)
    {
        return await _serviceAppointmentRepository.GetById(id);
    }

    public async Task<bool> Update(ServiceAppointmentUpdateDTO serviceAppointmentUpdateDTO)
    {
        var serviceAppointment = await _serviceAppointmentRepository.GetById(serviceAppointmentUpdateDTO.Id);

        if (serviceAppointment != null)
        {
            serviceAppointment.AppointmentId = serviceAppointmentUpdateDTO.Id;
            serviceAppointment.CategoryId = serviceAppointmentUpdateDTO.CategoryId;
            serviceAppointment.Date = serviceAppointmentUpdateDTO.Date;
            serviceAppointment.Time = serviceAppointmentUpdateDTO.Time;
            return await _serviceAppointmentRepository.Update(serviceAppointment);
        }
        return false;
    }
}
