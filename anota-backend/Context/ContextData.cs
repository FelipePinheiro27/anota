using anota_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Context;

public class ContextData : DbContext
{
    public ContextData(DbContextOptions<ContextData> options)
        : base(options)
    { }

    public DbSet<CompanyModel> Companies { get; set; }
    public DbSet<BlockModel> Blocks { get; set; }
}