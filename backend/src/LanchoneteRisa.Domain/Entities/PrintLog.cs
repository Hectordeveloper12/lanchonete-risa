namespace LanchoneteRisa.Domain.Entities;

public class PrintLog : BaseEntity
{
    public Guid TenantId { get; private set; }
    public Guid OrderId { get; private set; }
    public DateTime PrintedAt { get; private set; }
    public string PrinterName { get; private set; } = string.Empty;
    public bool Reprinted { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public Order Order { get; private set; } = null!;

    private PrintLog() { }

    public PrintLog(Guid tenantId, Guid orderId, string printerName, bool reprinted = false)
    {
        TenantId = tenantId;
        OrderId = orderId;
        PrinterName = printerName;
        Reprinted = reprinted;
        PrintedAt = DateTime.UtcNow;
    }
}
