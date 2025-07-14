using anota_backend.Enums;

namespace anota_backend.DTO;

public class ScheduledReservationDTO
{
    public string Id { get; set; }
    public string Client { get; set; }
    public string Client_phone { get; set; }
    public string Court_name { get; set; }
    public ModalityEnum Modality { get; set; }
    public double Price { get; set; }
    public DateTime Created_date { get; set; }
    public DateTime End_date { get; set; }
    public bool IsPaid { get; set; } = false;
}