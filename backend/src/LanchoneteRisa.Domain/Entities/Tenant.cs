using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Domain.Entities;

public class Tenant : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Cnpj { get; private set; } = string.Empty;
    public string? Address { get; private set; }
    public string? LogoUrl { get; private set; }
    public PlanType Plan { get; private set; }
    public bool IsActive { get; private set; }

    public IReadOnlyCollection<User> Users => _users.AsReadOnly();
    private readonly List<User> _users = [];

    private Tenant() { }

    public Tenant(string name, string cnpj, PlanType plan, string? address = null, string? logoUrl = null)
    {
        Name = name;
        Cnpj = cnpj;
        Plan = plan;
        Address = address;
        LogoUrl = logoUrl;
        IsActive = true;
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;
    public void UpdatePlan(PlanType plan) => Plan = plan;
}
