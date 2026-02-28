using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Application.Interfaces;
using LanchoneteRisa.Domain.Entities;
using LanchoneteRisa.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LanchoneteRisa.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> Login(string email, string password)
    {
        var user = await _context.Users
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u => u.Email == email && u.IsActive);

        if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        var token = GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = MapToDto(user)
        };
    }

    public async Task<UserDto> Register(User user, string password)
    {
        var existingUser = await _context.Users
            .IgnoreQueryFilters()
            .AnyAsync(u => u.Email == user.Email && u.TenantId == user.TenantId);

        if (existingUser)
            throw new InvalidOperationException("A user with this email already exists.");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return MapToDto(user);
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim("tenantId", user.TenantId.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static UserDto MapToDto(User user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Role = user.Role,
        IsActive = user.IsActive
    };
}
