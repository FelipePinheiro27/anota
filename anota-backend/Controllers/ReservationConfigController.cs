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

    [HttpGet("timeslots/{dayOfWeek}")]
    public async Task<ActionResult<IEnumerable<string>>> GetHourlySlots(int dayOfWeek)
    {
        var configs = await _context.ReservationsConfig
            .Where(rc => rc.Day_of_week == dayOfWeek)
            .ToListAsync();

        if (!configs.Any())
        {
            return NotFound("Nenhuma configuração encontrada para o dia da semana especificado.");
        }

        var timeSlots = new List<string>();
        foreach (var config in configs)
        {
            TimeSpan startTime = config.Start_time;
            TimeSpan endTime = config.End_time;

            while (startTime < endTime)
            {
                timeSlots.Add(startTime.ToString(@"hh\:mm"));
                startTime = startTime.Add(TimeSpan.FromHours(1));
            }
        }

        return Ok(timeSlots);
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
}
