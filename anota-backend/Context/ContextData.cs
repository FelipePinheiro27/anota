using anota_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Context;

public class ContextData : DbContext
{
    public ContextData(DbContextOptions<ContextData> options)
        : base(options)
    { }

    public DbSet<CompanyModel> Companies { get; set; }
    public DbSet<CourtModel> Courts { get; set; }
    public DbSet<ReservationModel> Reservations { get; set; }
    public DbSet<ReservationConfigModel> ReservationsConfig { get; set; }
    public DbSet<PlanModel> Plans { get; set; }
    public DbSet<SubscriptionModel> Subscriptions { get; set; }
    public DbSet<PaymentModel> Payments { get; set; }
}