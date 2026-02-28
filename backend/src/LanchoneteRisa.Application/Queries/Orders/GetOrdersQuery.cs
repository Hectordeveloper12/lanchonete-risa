using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Enums;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Orders;

public class GetOrdersQuery : IRequest<List<OrderDto>>
{
    public Guid TenantId { get; set; }
    public OrderStatus? Status { get; set; }
}
