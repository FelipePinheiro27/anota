namespace anota_backend.Models;
public class ReservationConfigModel
{
    public long Id { get; set; }
    public int Day_of_week { get; set; }
    public double Price { get; set; }
    public DateTime Start_date { get; set; }
    public DateTime End_date { get; set; }
}