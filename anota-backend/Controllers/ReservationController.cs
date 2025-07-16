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

    [HttpGet("myReservations/{id}")]
    public async Task<ActionResult<IEnumerable<ReservationModel>>> GetReservation(string id)
    {
        var currentDate = DateTime.UtcNow;

        var reservations = await _context.Reservations
        .Include(r => r.Court)
        .Where(r => (r.Id == id || r.User_phone == id) && r.Created_date >= currentDate)
        .ToListAsync();

        if (!reservations.Any())
        {
            return NotFound();
        }

        return Ok(reservations);
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
        try
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "DELETE FROM Reservation WHERE Id = {0}", id);

            if (result > 0)
            {
                return NoContent();
            }
            else
            {
                return NotFound("Reserva não encontrada.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ReservationModel>> UpdateReservation(string id, [FromBody] ReservationsDTO dto)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }

        var conflictingReservation = await _context.Reservations
            .Where(r => r.Court_id == dto.Court_id &&
                       r.Id != id &&
                       r.Created_date.Date == dto.Created_date.Date &&
                       ((r.Created_date < dto.End_date && r.End_date > dto.Created_date)))
            .FirstOrDefaultAsync();

        if (conflictingReservation != null)
        {
            return BadRequest("A quadra selecionada não está disponível neste horário.");
        }

        reservation.Court_id = dto.Court_id;
        reservation.Created_date = dto.Created_date;
        reservation.End_date = dto.End_date;
        reservation.Price = dto.Price;
        reservation.modality = dto.Modality;

        await _context.SaveChangesAsync();

        return Ok(reservation);
    }

    [HttpGet("scheduled/{companyId}/{date}")]
    public async Task<ActionResult<IEnumerable<ScheduledReservationDTO>>> GetReservationScheduled(long companyId, DateTime date)
    {
        var reservations = await _context.Reservations
            .Include(r => r.Court)
            .Where(r => r.Created_date.Date == date.Date && r.Court.Company_id == companyId)
            .ToListAsync();

        var scheduledReservations = reservations.Select(r => new ScheduledReservationDTO
        {
            Id = r.Id,
            Client = r.User_name,
            Client_phone = r.User_phone,
            Court_name = r.Court != null ? r.Court.Name : "Unknown",
            Modality = r.modality,
            Price = r.Price,
            Created_date = r.Created_date,
            End_date = r.End_date,
            IsPaid = r.IsPaid
        }).ToList();

        return Ok(scheduledReservations);
    }


    [HttpGet("available/{date}/{courtId}/{minutes}")]
    public async Task<ActionResult<IEnumerable<object>>> GetAvailableSlots(DateTime date, int courtId, int minutes)
    {
        int dayOfWeek = (int)date.DayOfWeek;

        TimeZoneInfo tzInfo = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
        DateTime currentDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tzInfo);

        var configs = await _context.ReservationsConfig
            .Where(rc => rc.Day_of_week == dayOfWeek && rc.Court_id == courtId)
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
                reservedStartTime = reservedStartTime.Add(TimeSpan.FromMinutes(minutes));
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
                DateTime slotDateTime = date.Date + startTime;
                DateTime slotDateTimeInTz = DateTime.SpecifyKind(slotDateTime, DateTimeKind.Unspecified);
                slotDateTimeInTz = TimeZoneInfo.ConvertTime(slotDateTimeInTz, tzInfo);

                string slotTime = startTime.ToString(@"hh\:mm");

                if (!reservedSlots.Contains(slotTime))
                {
                    availableSlots.Add(new
                    {
                        price,
                        start = slotTime,
                        end = startTime.Add(TimeSpan.FromMinutes(minutes)).ToString(@"hh\:mm")
                    });
                }

                startTime = startTime.Add(TimeSpan.FromMinutes(minutes));
            }
        }

        return Ok(availableSlots);
    }

    [HttpPost("fix")]
    public async Task<ActionResult> FixReservation([FromBody] FixReservationDTO dto)
    {
        if (dto.DurationMonths <= 0)
        {
            return BadRequest("A duração deve ser de pelo menos 1 mês.");
        }

        DateTime startDate = dto.StartDate;
        DateTime endDate = startDate.AddMonths(dto.DurationMonths).AddDays(-1);
        DayOfWeek targetDayOfWeek = startDate.DayOfWeek;

        var existingIds = new HashSet<string>(await _context.Reservations.Select(r => r.Id).ToListAsync());
        var reservations = new List<ReservationModel>();

        for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
        {
            if (date.DayOfWeek == targetDayOfWeek)
            {
                string newId;
                do
                {
                    newId = ReservationModel.GenerateUniqueId();
                } while (existingIds.Contains(newId));

                existingIds.Add(newId);

                reservations.Add(new ReservationModel
                {
                    Id = newId,
                    User_name = dto.User_name,
                    User_phone = dto.User_phone,
                    modality = dto.Modality,
                    Price = dto.Price,
                    Court_id = dto.Court_id,
                    Created_date = date.Date.Add(dto.StartTime),
                    End_date = date.Date.Add(dto.EndTime)
                });
            }
        }

        if (reservations.Count > 0)
        {
            await _context.Reservations.AddRangeAsync(reservations);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Reservas fixadas com sucesso!", reservations });
    }

    [HttpPut("mark-paid/{id}")]
    public async Task<ActionResult> MarkReservationAsPaid(string id, [FromBody] bool isPaid)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }
        reservation.IsPaid = isPaid;
        await _context.SaveChangesAsync();
        return Ok(new { reservation.Id, reservation.IsPaid });
    }

}