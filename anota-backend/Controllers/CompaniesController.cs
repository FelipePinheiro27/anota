using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using anota_backend.Context;
using anota_backend.Models;
using anota_backend.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace anota_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompaniesController : ControllerBase
    {
        private readonly ContextData _context;

        public CompaniesController(ContextData context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyModel>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyModel>> GetCompany(long id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        [HttpGet("routeKey/{pathRouteKey}")]
        public async Task<ActionResult<CompanyDTO>> GetCompanyByPathRouteKey(string pathRouteKey)
        {
            var company = await _context.Companies
                .FirstOrDefaultAsync(r => r.PathRouteKey == pathRouteKey);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(new CompanyDTO
            {
                Id = company.Id,
                Name = company.Name,
                PathRouteKey = company.PathRouteKey,
                PrimaryColor = company.primaryColor,
                SecondaryColor = company.SecondaryColor,
            });
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<CompanyModel>> CreateCompany([FromBody] CompanyModel company)
        {
            try
            {
                company.Pass = anota_backend.Helper.Encryption.generateHash(company.Pass);
                _context.Companies.Add(company);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(long id, CompanyModel company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(long id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(long id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var company = await _context.Companies
                .FirstOrDefaultAsync(c => c.Email == loginRequest.EmailOrUser || c.User == loginRequest.EmailOrUser);

            if (company == null)
            {
                return Unauthorized(new
                {
                    message = "Usuário ou email inválido.",
                    success = false
                });
            }

            if (!company.isValidPass(loginRequest.Password))
            {
                return Unauthorized(new { message = "Senha incorreta.", success = false });
            }

            if (company.IsPaid == false)
            {
                return Ok(new
                {
                    message = "Seu plano expirou. Renove sua assinatura para continuar acessando a plataforma.",
                    success = false
                });
            }

            var jwtKey = HttpContext.RequestServices.GetService<IConfiguration>()?["Jwt:Key"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("companyId", company.Id.ToString()),
                    new Claim("companyName", company.Name ?? "")
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Login realizado com sucesso.",
                companyId = company.Id,
                companyName = company.Name,
                token = jwt,
                success = true
            });
        }
    }
}
