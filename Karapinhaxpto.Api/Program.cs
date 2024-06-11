using FluentAssertions.Common;
using Karapinhaxpto.DAL;
using Karapinhaxpto.DAL.Repository;
using Karapinhaxpto.Model;
using Karapinhaxpto.Service;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Adicionar serviços
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


////Configuração da injecção de dependencia
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<ICategoryService, CategoryService>();

builder.Services.AddTransient<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddTransient<IAppointmentService, AppointmentService>();

builder.Services.AddTransient<IProfileRepository, ProfileRepository>();
builder.Services.AddTransient<IProfileService, ProfileService>();

builder.Services.AddTransient<IProfissionalRepository, ProfissionalRepository>();
builder.Services.AddTransient<IProfissionalService, ProfissionalService>();

builder.Services.AddTransient<IProfissionalScheduleRepository, ProfissionalScheduleRepository>();
builder.Services.AddTransient<IProfissionalScheduleService, ProfissionalScheduleService>();

builder.Services.AddTransient<IScheduleRepository, ScheduleRepository>();
builder.Services.AddTransient<IScheduleService, ScheduleService>();

builder.Services.AddTransient<IServiceRepository, ServiceRepository>();
builder.Services.AddTransient<IServiceService, ServiceService>();

builder.Services.AddTransient<IServiceAppointmentRepository, ServiceAppointmentRepository>();
builder.Services.AddTransient<IServiceAppointmentService, ServiceAppointmentService>();

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserService, UserService>();







builder.Services.Configure<IEmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailService, EmailService>();



// conexão com o banco de dados
builder.Services.AddDbContext<KarapinhaxptoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();


// Configurar o pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
