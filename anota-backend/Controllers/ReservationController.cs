using anota_backend.Context;
using anota_backend.DTO;
using anota_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly ContextData _context;

    public ReservationController(ContextData context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReservationModel>>> GetReservations()
    {
        return await _context.Reservations.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReservationModel>> GetReservation(long id)
    {
        var reservation = await _context.Reservations.FindAsync(id);

        if (reservation == null)
        {
            return NotFound();
        }

        return reservation;
    }

    [HttpPost]
    public async Task<ActionResult<ReservationModel>> CreateReservation(ReservationsDTO dto)
    {
        string newId;
        bool idExists;

        do
        {
            newId = ReservationModel.GenerateUniqueId();
            idExists = await _context.Reservations.AnyAsync(r => r.Id == newId);
        } while (idExists);

        ReservationModel reservation = new ReservationModel
        {
            Id = newId,
            User_name = dto.User_name,
            User_phone = dto.User_phone,
            Price = dto.Price,
            Court_id = dto.Court_id,
            Created_date = dto.Created_date,
            End_date = dto.End_date
        };

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteReservation(string id)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("available-slots/{dayOfWeek}")]
    public async Task<ActionResult<IEnumerable<DateTime>>> GetAvailableSlots(int dayOfWeek)
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

        var existingReservations = await _context.Reservations
            .Where(r => r.Created_date >= reservationConfig.Start_date && r.Created_date < reservationConfig.End_date)
            .Select(r => r.Created_date)
            .ToListAsync();

        var availableSlots = slots.Except(existingReservations).ToList();

        return Ok(availableSlots);
    }

}