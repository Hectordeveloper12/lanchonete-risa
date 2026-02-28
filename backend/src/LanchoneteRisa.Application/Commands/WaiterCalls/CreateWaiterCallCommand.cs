using MediatR;

namespace LanchoneteRisa.Application.Commands.WaiterCalls;

public class CreateWaiterCallCommand : IRequest<bool>
{
    public Guid TableSessionId { get; set; }
}
