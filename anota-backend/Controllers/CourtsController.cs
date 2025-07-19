using anota_backend.Context;
using anota_backend.DTO;
using anota_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CourtController : ControllerBase
{
    private readonly ContextData _context;

    public CourtController(ContextData context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourtModel>>> GetCourt()
    {
        return await _context.Courts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CourtModel>> GetCourt(long id)
    {
        var court = await _context.Courts.FindAsync(id);

        if (court == null)
        {
            return NotFound();
        }

        return court;
    }

    [HttpGet("company/{companyId}")]
    public async Task<ActionResult<List<CourtModel>>> GetCourtsByCompanyId(long companyId)
    {
        var courts = await _context.Courts
            .Where(r => r.Company_id == companyId)
            .ToListAsync();

        if (courts == null || courts.Count == 0)
        {
            return NotFound();
        }

        return Ok(courts);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourt(long id, CourtsDTO dto)
    {
        var existingCourt = await _context.Courts.FindAsync(id);
        if (existingCourt == null)
        {
            return NotFound(new { Message = "Court not found." });
        }

        existingCourt.Company_id = dto.Company_id;
        existingCourt.Name = dto.Name;
        existingCourt.Modality = dto.Modality;
        existingCourt.Description = dto.Description;
        existingCourt.Image_url = dto.Image_url;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Courts.Any(e => e.Id == id))
            {
                return NotFound(new { Message = "Court not found after concurrency check." });
            }
            throw;
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourt(CourtsDTO dto)
    {
        try
        {
            CourtModel court = new CourtModel
            {
                Company_id = dto.Company_id,
                Name = dto.Name,
                Modality = dto.Modality,
                Description = dto.Description,
                Image_url = dto.Image_url
            };
            _context.Courts.Add(court);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourt), new { id = court.Id }, court);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
        }
    }
}