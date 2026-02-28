namespace LanchoneteRisa.Domain.Entities;

public class AuditLog : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid UserId { get; private set; }
    public string Action { get; private set; } = string.Empty;
    public string? Details { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public User User { get; private set; } = null!;

    private AuditLog() { }

    public AuditLog(Guid tenantId, Guid userId, string action, string? details = null)
    {
        TenantId = tenantId;
        UserId = userId;
        Action = action;
        Details = details;
    }
}
