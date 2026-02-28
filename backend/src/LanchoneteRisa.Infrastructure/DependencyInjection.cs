using LanchoneteRisa.Application.Interfaces;
using LanchoneteRisa.Domain.Interfaces;
using LanchoneteRisa.Infrastructure.Hubs;
using LanchoneteRisa.Infrastructure.Persistence;
using LanchoneteRisa.Infrastructure.Repositories;
using LanchoneteRisa.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LanchoneteRisa.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // DbContext
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        // Repositories
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Services
        services.AddScoped<ITenantProvider, TenantProvider>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IQrCodeService, QrCodeService>();
        services.AddScoped<IPrintService, PrintService>();
        services.AddScoped<ISignalRService, SignalRService>();

        // Redis Cache
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("Redis");
            options.InstanceName = "LanchoneteRisa:";
        });

        // SignalR
        services.AddSignalR();

        return services;
    }
}
