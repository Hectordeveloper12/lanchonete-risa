using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Domain.Entities;

public class Order : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid TableSessionId { get; private set; }
    public Guid? WaiterId { get; private set; }
    public OrderStatus Status { get; private set; }
    public string? Notes { get; private set; }
    public decimal TotalAmount { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public TableSession TableSession { get; private set; } = null!;
    public User? Waiter { get; private set; }
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();
    private readonly List<OrderItem> _items = [];

    private Order() { }

    public Order(Guid tenantId, Guid tableSessionId, string? notes = null, Guid? waiterId = null)
    {
        TenantId = tenantId;
        TableSessionId = tableSessionId;
        Notes = notes;
        WaiterId = waiterId;
        Status = OrderStatus.Received;
        TotalAmount = 0;
    }

    public void AddItem(OrderItem item)
    {
        _items.Add(item);
        RecalculateTotal();
    }

    public void UpdateStatus(OrderStatus status)
    {
        Status = status;
        SetUpdatedAt();
    }

    private void RecalculateTotal()
    {
        TotalAmount = _items.Sum(i => i.UnitPrice * i.Quantity);
    }
}
