using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Enums;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Auth;

public class RegisterCommand : IRequest<UserDto>
{
    public Guid TenantId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public UserRole Role { get; set; }
}
