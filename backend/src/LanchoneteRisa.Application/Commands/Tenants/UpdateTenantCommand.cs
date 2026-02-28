using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Enums;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Tenants;

public class UpdateTenantCommand : IRequest<TenantDto>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Cnpj { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string? LogoUrl { get; set; }
    public PlanType Plan { get; set; }
}
