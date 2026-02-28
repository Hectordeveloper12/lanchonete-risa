using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Categories;

public class GetCategoriesQuery : IRequest<List<CategoryDto>>
{
    public Guid TenantId { get; set; }
}
