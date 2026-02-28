using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Tables;

public class CreateTableCommand : IRequest<TableDto>
{
    public Guid TenantId { get; set; }
    public int Number { get; set; }
}
