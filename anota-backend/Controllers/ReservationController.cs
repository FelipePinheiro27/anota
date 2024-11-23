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
            modality = dto.Modality,
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

    [HttpGet("scheduled/{date}")]
    public async Task<ActionResult<IEnumerable<ScheduledReservationDTO>>> GetReservationScheduled(DateTime date)
    {
        var reservations = await _context.Reservations
            .Include(r => r.Court)
            .Where(r => r.Created_date.Date == date.Date)
            .ToListAsync();

        var scheduledReservations = reservations.Select(r => new ScheduledReservationDTO
        {
            Client = r.User_name,
            Client_phone = r.User_phone,
            Court_name = r.Court != null ? r.Court.Name : "Unknown",
            Modality = r.modality,
            Price = r.Price,
            Created_date = r.Created_date,
            End_date = r.End_date
        }).ToList();

        return Ok(scheduledReservations);
    }


    [HttpGet("available/{date}/{courtId}")]
    public async Task<ActionResult<IEnumerable<object>>> GetAvailableSlots(DateTime date, int courtId)
    {
        int dayOfWeek = (int)date.DayOfWeek;

        var configs = await _context.ReservationsConfig
            .Where(rc => rc.Day_of_week == dayOfWeek)
            .ToListAsync();

        if (!configs.Any())
        {
            return NotFound("Nenhuma configuração de reserva para o dia especificado.");
        }

        var reservations = await _context.Reservations
            .Where(r => r.Created_date.Date == date.Date && r.Court_id == courtId)
            .ToListAsync();

        var reservedSlots = new HashSet<string>();
        foreach (var reservation in reservations)
        {
            TimeSpan reservedStartTime = reservation.Created_date.TimeOfDay;
            TimeSpan reservedEndTime = reservation.End_date.TimeOfDay;

            while (reservedStartTime < reservedEndTime)
            {
                reservedSlots.Add(reservedStartTime.ToString(@"hh\:mm"));
                reservedStartTime = reservedStartTime.Add(TimeSpan.FromHours(1));
            }
        }

        var availableSlots = new List<object>();
        foreach (var config in configs)
        {
            TimeSpan startTime = config.Start_time;
            TimeSpan endTime = config.End_time;
            double price = config.Price;

            while (startTime < endTime)
            {
                string slotTime = startTime.ToString(@"hh\:mm");

                if (!reservedSlots.Contains(slotTime))
                {
                    availableSlots.Add(new
                    {
                        price,
                        start = slotTime,
                        end = startTime.Add(TimeSpan.FromHours(1)).ToString(@"hh\:mm")
                    });
                }

                startTime = startTime.Add(TimeSpan.FromHours(1));
            }
        }

        return Ok(availableSlots);
    }
}