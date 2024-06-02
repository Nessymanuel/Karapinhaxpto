using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IServiceAppointmentService
{
    Task<ServiceAppointment> GetById(int id);
    Task<List<ServiceAppointment>> GetAll();
    Task<bool> Update(ServiceAppointmentUpdateDTO serviceAppointmentUpdateDTO);
    Task<bool> Create(ServiceAppointmentAddDTO serviceAppointmentAddDTO);
    Task<bool> Delete(int id);
}
