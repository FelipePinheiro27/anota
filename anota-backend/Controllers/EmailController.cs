using Microsoft.AspNetCore.Mvc;
using anota_backend.Services;
using System.Threading.Tasks;

namespace anota_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly SendGridEmailService _sendGridEmailService;
        public EmailController(SendGridEmailService sendGridEmailService)
        {
            _sendGridEmailService = sendGridEmailService;
        }
    }
}