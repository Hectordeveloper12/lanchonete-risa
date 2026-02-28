using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Application.DTOs;

public class PaymentDto
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
    public DateTime PaidAt { get; set; }
}
