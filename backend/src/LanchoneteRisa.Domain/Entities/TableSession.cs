using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Domain.Entities;

public class TableSession : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid TableId { get; private set; }
    public DateTime OpenedAt { get; private set; }
    public DateTime? ClosedAt { get; private set; }
    public TableSessionStatus Status { get; private set; }
    public Guid? CustomerId { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public Table Table { get; private set; } = null!;
    public User? Customer { get; private set; }
    public IReadOnlyCollection<Order> Orders => _orders.AsReadOnly();
    private readonly List<Order> _orders = [];

    private TableSession() { }

    public TableSession(Guid tenantId, Guid tableId, Guid? customerId = null)
    {
        TenantId = tenantId;
        TableId = tableId;
        CustomerId = customerId;
        OpenedAt = DateTime.UtcNow;
        Status = TableSessionStatus.Open;
    }

    public void Close()
    {
        Status = TableSessionStatus.Closed;
        ClosedAt = DateTime.UtcNow;
    }
}
