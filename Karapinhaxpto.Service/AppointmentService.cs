using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public async Task<bool> Create(AppointmentAddDTO appointmentAddDTO)
        {
            var appointment = new Appointment
            {
                DateTime = appointmentAddDTO.DateTime,
                Total_Price = appointmentAddDTO.TotalPrice,
                Status = appointmentAddDTO.Status,
                User_ID = appointmentAddDTO.UserId
            };
            return await _appointmentRepository.Create(appointment);
        }

        public async Task<bool> Delete(int id)
        {
            var appointment = await _appointmentRepository.GetById(id);
            if (appointment != null)
            {
                return await _appointmentRepository.Delete(appointment);
            }
            return false;
        }

        public async Task<List<Appointment>> GetAll()
        {
            return await _appointmentRepository.GetAll();
        }

        public async Task<Appointment> GetById(int id)
        {
            return await _appointmentRepository.GetById(id);
        }

        public async Task<bool> Update(AppointmentUpdateDTO appointmentUpdateDTO)
        {
            var appointment = await _appointmentRepository.GetById(appointmentUpdateDTO.Id);
            if (appointment != null)
            {
                appointment.DateTime = appointmentUpdateDTO.DateTime;
                appointment.Total_Price = appointmentUpdateDTO.TotalPrice;
                appointment.Status = appointmentUpdateDTO.Status;
                appointment.User_ID = appointmentUpdateDTO.UserId;
                return await _appointmentRepository.Update(appointment);
            }
            return false;
        }
    }
}
