using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Sessions;

public class GetActiveSessionsQuery : IRequest<List<TableSessionDto>>
{
    public Guid TenantId { get; set; }
}
