using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace anota_backend.Models;

public enum PaymentStatus
{
    pending,
    succeeded,
    failed,
    refunded
}

[Table("Payment")]
public class PaymentModel
{
    public int Id { get; set; }
    [Required]
    public int SubscriptionId { get; set; }
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public PaymentStatus Status { get; set; }
    public string PaymentGatewayTransactionId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }

    [ForeignKey("SubscriptionId")]
    public SubscriptionModel Subscription { get; set; }
} 