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

    [HttpPost]
    public async Task<IActionResult> CreateCourt(CourtsDTO dto)
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
}