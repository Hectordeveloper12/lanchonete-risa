using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Menu;

public class GetMenuQuery : IRequest<List<MenuCategoryDto>>
{
    public Guid TenantId { get; set; }
}
