namespace LanchoneteRisa.Domain.Entities;

public class Category : BaseEntity
{
    public Guid? TenantId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public bool IsGlobal { get; private set; }
    public int SortOrder { get; private set; }

    public Tenant? Tenant { get; private set; }
    public IReadOnlyCollection<Product> Products => _products.AsReadOnly();
    private readonly List<Product> _products = [];

    private Category() { }

    public Category(string name, string? description, int sortOrder, Guid? tenantId = null)
    {
        Name = name;
        Description = description;
        SortOrder = sortOrder;
        TenantId = tenantId;
        IsGlobal = tenantId is null;
    }
}
