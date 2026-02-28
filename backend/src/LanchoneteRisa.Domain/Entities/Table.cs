namespace LanchoneteRisa.Domain.Entities;

public class Table : BaseEntity
{
    public Guid TenantId { get; private set; }
    public int Number { get; private set; }
    public string? QrCodeUrl { get; private set; }
    public bool IsActive { get; private set; }

    public Tenant Tenant { get; private set; } = null!;
    public IReadOnlyCollection<TableSession> Sessions => _sessions.AsReadOnly();
    private readonly List<TableSession> _sessions = [];

    private Table() { }

    public Table(Guid tenantId, int number, string? qrCodeUrl = null)
    {
        TenantId = tenantId;
        Number = number;
        QrCodeUrl = qrCodeUrl;
        IsActive = true;
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;
}
