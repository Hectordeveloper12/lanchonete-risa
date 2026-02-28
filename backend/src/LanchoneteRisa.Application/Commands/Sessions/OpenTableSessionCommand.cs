using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Sessions;

public class OpenTableSessionCommand : IRequest<TableSessionDto>
{
    public Guid TableId { get; set; }
    public Guid? CustomerId { get; set; }
}
