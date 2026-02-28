using System.Net;
using System.Text.Json;
using FluentValidation;

namespace LanchoneteRisa.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, message) = exception switch
        {
            ValidationException validationEx => (
                HttpStatusCode.BadRequest,
                (object)new
                {
                    error = "Validation failed",
                    details = validationEx.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
                }),
            UnauthorizedAccessException => (
                HttpStatusCode.Unauthorized,
                (object)new { error = "Unauthorized" }),
            KeyNotFoundException => (
                HttpStatusCode.NotFound,
                (object)new { error = exception.Message }),
            ArgumentException => (
                HttpStatusCode.BadRequest,
                (object)new { error = exception.Message }),
            _ => (
                HttpStatusCode.InternalServerError,
                (object)new { error = "An unexpected error occurred" })
        };

        if (statusCode == HttpStatusCode.InternalServerError)
        {
            _logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);
        }
        else
        {
            _logger.LogWarning(exception, "Handled exception ({StatusCode}): {Message}",
                (int)statusCode, exception.Message);
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var json = JsonSerializer.Serialize(message, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(json);
    }
}
