namespace LanchoneteRisa.Domain.Entities;

public class Product : BaseEntity
{
    public Guid? TenantId { get; private set; }
    public Guid CategoryId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public decimal Price { get; private set; }
    public string? ImageUrl { get; private set; }
    public bool IsAvailable { get; private set; }
    public bool IsGlobal { get; private set; }

    public Tenant? Tenant { get; private set; }
    public Category Category { get; private set; } = null!;

    private Product() { }

    public Product(Guid categoryId, string name, string? description, decimal price, string? imageUrl = null, Guid? tenantId = null)
    {
        CategoryId = categoryId;
        Name = name;
        Description = description;
        Price = price;
        ImageUrl = imageUrl;
        TenantId = tenantId;
        IsAvailable = true;
        IsGlobal = tenantId is null;
    }

    public void MarkUnavailable() => IsAvailable = false;
    public void MarkAvailable() => IsAvailable = true;
    public void UpdatePrice(decimal price) => Price = price;
}
