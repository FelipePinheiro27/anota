using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace anota_backend.Models;

public enum SubscriptionStatus
{
    trialing,
    active,
    past_due,
    canceled
}

[Table("Subscription")]
public class SubscriptionModel
{
    public int Id { get; set; }
    [Required]
    public long CompanyId { get; set; }
    public int? PlanId { get; set; }
    [Required]
    public SubscriptionStatus Status { get; set; }
    public DateTime? TrialStartsAt { get; set; }
    public DateTime? TrialEndsAt { get; set; }
    public DateTime? CurrentPeriodEndsAt { get; set; }
    public DateTime? CanceledAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("CompanyId")]
    public CompanyModel Company { get; set; }
    [ForeignKey("PlanId")]
    public PlanModel Plan { get; set; }
} 