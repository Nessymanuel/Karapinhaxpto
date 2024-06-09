using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Karapinhaxpto.Shared.IService
{
    public interface IEmailService
    {
        Task SendEmail(string toEmail, string subject, string message);
    }
}
