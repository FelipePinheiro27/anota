namespace anota_backend.Models;
public class ReservationConfigModel
{
    public long Id { get; set; }
    public int Day_of_week { get; set; }
    public double Price { get; set; }
    public TimeSpan Start_time { get; set; }
    public TimeSpan End_time { get; set; }
}