namespace LanchoneteRisa.Domain.Entities;

public class WaiterCall : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid TableSessionId { get; private set; }
    public DateTime CalledAt { get; private set; }
    public DateTime? AttendedAt { get; private set; }
    public Guid? AttendedById { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public TableSession TableSession { get; private set; } = null!;
    public User? AttendedBy { get; private set; }

    private WaiterCall() { }

    public WaiterCall(Guid tenantId, Guid tableSessionId)
    {
        TenantId = tenantId;
        TableSessionId = tableSessionId;
        CalledAt = DateTime.UtcNow;
    }

    public void MarkAttended(Guid attendedById)
    {
        AttendedById = attendedById;
        AttendedAt = DateTime.UtcNow;
    }
}
