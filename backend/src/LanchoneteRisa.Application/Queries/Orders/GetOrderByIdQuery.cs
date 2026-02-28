using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Orders;

public class GetOrderByIdQuery : IRequest<OrderDto>
{
    public Guid Id { get; set; }
}
