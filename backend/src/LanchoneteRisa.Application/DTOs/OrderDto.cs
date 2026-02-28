using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Application.DTOs;

public class OrderDto
{
    public Guid Id { get; set; }
    public Guid TableSessionId { get; set; }
    public int TableNumber { get; set; }
    public Guid? WaiterId { get; set; }
    public string? WaiterName { get; set; }
    public OrderStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemDto> Items { get; set; } = [];
}
