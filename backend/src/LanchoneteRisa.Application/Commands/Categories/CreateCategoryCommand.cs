using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Categories;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public Guid? TenantId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int SortOrder { get; set; }
}
