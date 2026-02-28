using MediatR;

namespace LanchoneteRisa.Application.Commands.Sessions;

public class CloseTableSessionCommand : IRequest<bool>
{
    public Guid SessionId { get; set; }
}
