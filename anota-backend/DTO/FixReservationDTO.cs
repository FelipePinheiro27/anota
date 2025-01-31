using anota_backend.Enums;

namespace anota_backend.DTO;

public class FixReservationDTO
{
    public string User_name { get; set; }
    public string User_phone { get; set; }
    public ModalityEnum Modality { get; set; }
    public double Price { get; set; }
    public int Court_id { get; set; }
    public DateTime StartDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int DurationMonths { get; set; }
}