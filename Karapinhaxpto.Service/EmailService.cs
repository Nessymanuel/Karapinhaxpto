using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Karapinhaxpto.Shared.IService;
using MailKit.Net.Smtp;
using MimeKit;
using Karapinhaxpto.Shared.IRepository;
using Microsoft.Extensions.Logging;

namespace Karapinhaxpto.Service;

public class EmailService : IEmailService
{
    private readonly IEmailSettings _emailSettings;

    public EmailService(IOptions<IEmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;


    }

    public async Task SendEmail(string toEmail, string subject, string message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(_emailSettings.Name, _emailSettings.Email));
        emailMessage.To.Add(new MailboxAddress("Adm", "graciethmanuel13@gmail.com"));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("plain") { Text = message };

        using (var user = new SmtpClient())
        {
            user.CheckCertificateRevocation = false;
            user.ServerCertificateValidationCallback = (s, c, h, e) => true;
            await user.ConnectAsync(_emailSettings.Server, _emailSettings.Port, MailKit.Security.SecureSocketOptions.Auto);
            await user.AuthenticateAsync(_emailSettings.User, _emailSettings.Password);
            await user.SendAsync(emailMessage);
            await user.DisconnectAsync(true);
        }
    }
}
