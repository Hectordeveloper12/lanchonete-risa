using LanchoneteRisa.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace LanchoneteRisa.Infrastructure.Services;

public class TenantProvider : ITenantProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid GetTenantId()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext is null)
            return Guid.Empty;

        // Try JWT claim first
        var tenantClaim = httpContext.User?.FindFirst("tenantId")?.Value;
        if (!string.IsNullOrEmpty(tenantClaim) && Guid.TryParse(tenantClaim, out var tenantIdFromClaim))
            return tenantIdFromClaim;

        // Fallback to header
        if (httpContext.Request.Headers.TryGetValue("X-Tenant-Id", out var headerValue)
            && Guid.TryParse(headerValue, out var tenantIdFromHeader))
            return tenantIdFromHeader;

        return Guid.Empty;
    }
}
