using System.Security.Claims;

namespace LanchoneteRisa.API.Middleware;

public class TenantMiddleware
{
    private readonly RequestDelegate _next;

    public TenantMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var tenantId = ResolveTenantId(context);

        if (tenantId != Guid.Empty)
        {
            context.Items["TenantId"] = tenantId;
        }

        await _next(context);
    }

    private static Guid ResolveTenantId(HttpContext context)
    {
        // 1. Try JWT claim
        var claim = context.User.FindFirst("tenantId");
        if (claim is not null && Guid.TryParse(claim.Value, out var fromClaim))
            return fromClaim;

        // 2. Try header
        if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var headerValue)
            && Guid.TryParse(headerValue, out var fromHeader))
            return fromHeader;

        // 3. Try subdomain
        var host = context.Request.Host.Host;
        var parts = host.Split('.');
        if (parts.Length > 2)
        {
            // Subdomain-based tenant resolution would require a lookup service;
            // for now, only claim and header are supported.
        }

        return Guid.Empty;
    }
}
