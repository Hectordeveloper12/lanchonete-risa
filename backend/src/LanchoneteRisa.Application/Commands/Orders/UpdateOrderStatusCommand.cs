using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Enums;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Orders;

public class UpdateOrderStatusCommand : IRequest<OrderDto>
{
    public Guid OrderId { get; set; }
    public OrderStatus Status { get; set; }
}
