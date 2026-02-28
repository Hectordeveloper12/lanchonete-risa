using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Tenants;

public class GetAllTenantsQuery : IRequest<List<TenantDto>>
{
}
