using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace anota_backend.Models;

public enum PlanInterval
{
    month,
    year
}

[Table("Plan")]
public class PlanModel
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public PlanInterval Interval { get; set; }
    public bool IsActive { get; set; } = true;
} 