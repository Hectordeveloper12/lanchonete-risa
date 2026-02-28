using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Application.Interfaces;
using LanchoneteRisa.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace LanchoneteRisa.Infrastructure.Services;

public class SignalRService : ISignalRService
{
    private readonly IHubContext<OrderHub> _hubContext;

    public SignalRService(IHubContext<OrderHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendOrderUpdate(Guid tenantId, OrderDto order)
    {
        await _hubContext.Clients
            .Group(tenantId.ToString())
            .SendAsync("OrderUpdated", order);
    }

    public async Task SendNewOrder(Guid tenantId, OrderDto order)
    {
        await _hubContext.Clients
            .Group(tenantId.ToString())
            .SendAsync("NewOrder", order);
    }

    public async Task SendWaiterCall(Guid tenantId, Guid tableSessionId)
    {
        await _hubContext.Clients
            .Group(tenantId.ToString())
            .SendAsync("WaiterCall", tableSessionId);
    }
}
