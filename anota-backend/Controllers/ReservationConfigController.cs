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

    [HttpGet("court/{courtId}")]
    public async Task<ActionResult<IEnumerable<ReservationConfigModel>>> GetReservationsByCourt(long courtId)
    {
        var reservations = await _context.ReservationsConfig
            .Where(rc => rc.Court_id == courtId)
            .ToListAsync();

        if (!reservations.Any())
        {
            return NotFound("Nenhuma configuração encontrada para a quadra especificada.");
        }

        return Ok(reservations);
    }

    [HttpPost("bulk")]
    public async Task<IActionResult> UpsertReservationsConfig([FromBody] List<ReservationConfigModel> reservationsConfig)
    {
        if (reservationsConfig == null || !reservationsConfig.Any())
        {
            return BadRequest("A lista de configurações não pode estar vazia.");
        }

        foreach (var config in reservationsConfig)
        {
            var existingConfig = await _context.ReservationsConfig
                .FirstOrDefaultAsync(rc => rc.Id == config.Id);

            if (existingConfig != null)
            {
                existingConfig.Day_of_week = config.Day_of_week;
                existingConfig.Price = config.Price;
                existingConfig.Start_time = config.Start_time;
                existingConfig.End_time = config.End_time;
                existingConfig.Court_id = config.Court_id;

                _context.ReservationsConfig.Update(existingConfig);
            }
            else
            {
                // Insert via SQL direto para evitar RETURNING
                var sql = @"INSERT INTO ReservationsConfig (Court_id, Day_of_week, Start_time, End_time, Price)
                             VALUES ({0}, {1}, {2}, {3}, {4})";
                await _context.Database.ExecuteSqlRawAsync(sql,
                    config.Court_id,
                    config.Day_of_week,
                    config.Start_time,
                    config.End_time,
                    config.Price
                );
            }
        }

        await _context.SaveChangesAsync();
        return Ok("Configurações de reserva processadas com sucesso.");
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
