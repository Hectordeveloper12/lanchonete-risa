using MediatR;

namespace LanchoneteRisa.Application.Commands.Categories;

public class DeleteCategoryCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}
