using MediatR;

namespace LanchoneteRisa.Application.Commands.Orders;

public class CancelOrderItemCommand : IRequest<bool>
{
    public Guid OrderItemId { get; set; }
    public string? Reason { get; set; }
}
