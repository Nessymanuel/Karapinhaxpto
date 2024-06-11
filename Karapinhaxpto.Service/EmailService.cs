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
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<IEmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;


    }

    public async Task SendEmail(string toEmail, string subject, string message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        emailMessage.To.Add(new MailboxAddress("", "20200780@isptec.co.ao"));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("plain") { Text = message };

        using (var client = new SmtpClient())
        {
            client.CheckCertificateRevocation = false;
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.SmtpPort, MailKit.Security.SecureSocketOptions.Auto);
            await client.AuthenticateAsync(_emailSettings.SmtpUser, _emailSettings.SmtpPass);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
    }
}
