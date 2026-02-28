using MediatR;

namespace LanchoneteRisa.Application.Commands.Tenants;

public class ToggleTenantCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}
