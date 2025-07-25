using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace anota_backend.Services
{
    public class SendGridEmailService
    {
        private readonly IConfiguration _configuration;
        public SendGridEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendWelcomeEmailAsync(string toEmail, string name)
        {
            var apiKey = Environment.GetEnvironmentVariable("SEND_GRID_SECRET");
            var fromEmail = Environment.GetEnvironmentVariable("SEND_GRID_EMAIL");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, "Anota Reservas");
            var to = new EmailAddress(toEmail, name);
            var subject = "Bem-vindo ao Anota!";
            var plainTextContent = $"Olá {name},\n\nSua conta foi criada com sucesso no Anota!\n\nObrigado por se cadastrar.";
            var htmlContent = $"<p>Olá {name},</p><p>Sua conta foi criada com sucesso no <b>Anota</b>!</p><p>Obrigado por se cadastrar.</p>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }
    }
}