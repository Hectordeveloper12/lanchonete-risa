using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Domain.Entities;

public class Payment : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid OrderId { get; private set; }
    public decimal Amount { get; private set; }
    public PaymentMethod Method { get; private set; }
    public DateTime PaidAt { get; private set; }
    public Guid ProcessedById { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public Order Order { get; private set; } = null!;
    public User ProcessedBy { get; private set; } = null!;

    private Payment() { }

    public Payment(Guid tenantId, Guid orderId, decimal amount, PaymentMethod method, Guid processedById)
    {
        TenantId = tenantId;
        OrderId = orderId;
        Amount = amount;
        Method = method;
        ProcessedById = processedById;
        PaidAt = DateTime.UtcNow;
    }
}
