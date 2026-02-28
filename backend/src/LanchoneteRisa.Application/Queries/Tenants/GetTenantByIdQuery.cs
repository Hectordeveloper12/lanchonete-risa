using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Tenants;

public class GetTenantByIdQuery : IRequest<TenantDto>
{
    public Guid Id { get; set; }
}
