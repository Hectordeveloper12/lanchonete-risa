using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Tables;

public class CreateBatchTablesCommand : IRequest<List<TableDto>>
{
    public Guid TenantId { get; set; }
    public int StartNumber { get; set; }
    public int EndNumber { get; set; }
}
