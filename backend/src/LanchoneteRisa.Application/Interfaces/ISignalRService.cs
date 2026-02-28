using LanchoneteRisa.Application.DTOs;

namespace LanchoneteRisa.Application.Interfaces;

public interface ISignalRService
{
    Task SendOrderUpdate(Guid tenantId, OrderDto order);
    Task SendWaiterCall(Guid tenantId, Guid tableSessionId);
    Task SendNewOrder(Guid tenantId, OrderDto order);
}
