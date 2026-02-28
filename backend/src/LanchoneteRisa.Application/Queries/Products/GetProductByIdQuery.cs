using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Products;

public class GetProductByIdQuery : IRequest<ProductDto>
{
    public Guid Id { get; set; }
}
