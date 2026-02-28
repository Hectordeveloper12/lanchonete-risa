using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Orders;

public class CreateOrderCommand : IRequest<OrderDto>
{
    public Guid TableSessionId { get; set; }
    public Guid? WaiterId { get; set; }
    public string? Notes { get; set; }
    public List<CreateOrderItemCommand> Items { get; set; } = [];
}

public class CreateOrderItemCommand
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public string? Notes { get; set; }
}
