using anota_backend.Enums;

namespace anota_backend.DTO;

public class ReservationsDTO
{
    public string User_name { get; set; }
    public string User_phone { get; set; }
    public long Court_id { get; set; }
    public ModalityEnum Modality { get; set; }
    public double Price { get; set; }
    public DateTime Created_date { get; set; }
    public DateTime End_date { get; set; }
}