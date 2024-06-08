﻿using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DAL.Repository;
public class AppointmentRepository : GenericRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(KarapinhaxptoContext context) : base(context)
    {
    }
}
