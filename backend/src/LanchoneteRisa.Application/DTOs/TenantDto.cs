using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Application.DTOs;

public class TenantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Cnpj { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? LogoUrl { get; set; }
    public PlanType Plan { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
