using MediatR;

namespace LanchoneteRisa.Application.Commands.Products;

public class ToggleProductAvailabilityCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}
