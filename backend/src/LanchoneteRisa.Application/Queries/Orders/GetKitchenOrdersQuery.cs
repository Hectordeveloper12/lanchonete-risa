using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Orders;

public class GetKitchenOrdersQuery : IRequest<List<OrderDto>>
{
    public Guid TenantId { get; set; }
}
