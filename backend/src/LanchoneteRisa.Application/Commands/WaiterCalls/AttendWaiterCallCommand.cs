using MediatR;

namespace LanchoneteRisa.Application.Commands.WaiterCalls;

public class AttendWaiterCallCommand : IRequest<bool>
{
    public Guid CallId { get; set; }
    public Guid AttendedById { get; set; }
}
