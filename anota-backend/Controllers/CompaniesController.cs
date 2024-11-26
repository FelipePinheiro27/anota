using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using anota_backend.Context;
using anota_backend.Models;
using anota_backend.DTO;

namespace anota_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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


        [HttpPost]
        public async Task<ActionResult<CompanyModel>> CreateCompany(CompanyModel company)
        {
            company.parsePassToHash();
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
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

            return Ok(new
            {
                message = "Login realizado com sucesso.",
                companyId = company.Id,
                companyName = company.Name,
                success = true
            });
        }
    }
}
