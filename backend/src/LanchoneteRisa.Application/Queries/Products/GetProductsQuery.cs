using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Products;

public class GetProductsQuery : IRequest<List<ProductDto>>
{
    public Guid TenantId { get; set; }
    public Guid? CategoryId { get; set; }
}
