using anota_backend.Context;
using anota_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ReservationConfigController : ControllerBase
{
    private readonly ContextData _context;

    public ReservationConfigController(ContextData context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReservationConfigModel>>> GetReservationsConfig()
    {
        return await _context.ReservationsConfig.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReservationConfigModel>> GetReservationConfig(long id)
    {
        var reservation = await _context.ReservationsConfig.FindAsync(id);

        if (reservation == null)
        {
            return NotFound();
        }

        return reservation;
    }

    [HttpPost]
    public async Task<ActionResult<ReservationConfigModel>> CreateReservationConfig(ReservationConfigModel reservationConfig)
    {
        _context.ReservationsConfig.Add(reservationConfig);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetReservationConfig), new { id = reservationConfig.Id }, reservationConfig);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReservationConfig(long id)
    {
        var reservationConfig = await _context.ReservationsConfig.FindAsync(id);
        if (reservationConfig == null)
        {
            return NotFound();
        }

        _context.ReservationsConfig.Remove(reservationConfig);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("day/{dayOfWeek}")]
    public async Task<ActionResult<IEnumerable<DateTime>>> GetHourlySlotsByDayOfWeek(int dayOfWeek)
    {
        var reservationConfig = await _context.ReservationsConfig
            .Where(r => r.Day_of_week == dayOfWeek)
            .FirstOrDefaultAsync();

        if (reservationConfig == null)
        {
            return NotFound();
        }

        var slots = new List<DateTime>();
        var currentSlot = reservationConfig.Start_date;

        while (currentSlot < reservationConfig.End_date)
        {
            slots.Add(currentSlot);
            currentSlot = currentSlot.AddHours(1);
        }

        return Ok(slots);
    }
}