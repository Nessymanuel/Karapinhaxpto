using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IService;
public interface IAppointmentService
{
    Task<Appointment> GetById(int id);
    Task<List<Appointment>> GetAll();
    Task<bool> Update(AppointmentUpdateDTO appointmentUpdateDTO);
    Task<bool> Create(AppointmentAddDTO appointmentAddDTO);
    Task<bool> Delete(int id);
}
