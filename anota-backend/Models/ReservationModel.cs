using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace anota_backend.Models;

[Table("Reservation")]
public class ReservationModel
{
    public string Id { get; set; } = GenerateUniqueId();
    public string User_name { get; set; }
    public string User_phone { get; set; }
    [ForeignKey("Court")]
    public long Court_id { get; set; }
    public CourtModel Court { get; set; }
    public double Price { get; set; }
    public DateTime Created_date { get; set; }
    public DateTime End_date { get; set; }

    public static string GenerateUniqueId()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        var id = new char[6];

        for (int i = 0; i < id.Length; i++)
        {
            id[i] = chars[random.Next(chars.Length)];
        }

        return new string(id);
    }

    public override string ToString()
    {
        return $"Reservation ID: {Id}, User Name: {User_name}, User Phone: {User_phone}, Court ID: {Court_id}, " +
               $"Created Date: {Created_date}, End Date: {End_date}, Price: {Price}";
    }

}
