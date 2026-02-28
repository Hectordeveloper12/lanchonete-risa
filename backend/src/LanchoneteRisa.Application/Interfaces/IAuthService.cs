using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Entities;

namespace LanchoneteRisa.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> Login(string email, string password);
    Task<UserDto> Register(User user, string password);
    string GenerateToken(User user);
}
