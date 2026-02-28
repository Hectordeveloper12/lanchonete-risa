using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Sessions;

public class GetSessionByTableQuery : IRequest<TableSessionDto>
{
    public Guid TableId { get; set; }
}
