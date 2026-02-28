using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Tables;

public class GetTablesQuery : IRequest<List<TableDto>>
{
    public Guid TenantId { get; set; }
}
