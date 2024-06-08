using Karapinhaxpto.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace Karapinhaxpto.DAL;
public class KarapinhaxptoContext : DbContext
{

    public KarapinhaxptoContext(DbContextOptions<KarapinhaxptoContext> options)
            : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Profissional> Profissional { get; set; }
    public DbSet<ProfissionalSchedule> ProfissionalSchedules { get; set; }
    public DbSet<Schedule> Schedules { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<ServiceAppointment> ServicesAppointment { get; set; }

}
