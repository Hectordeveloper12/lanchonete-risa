using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Enums;
using MediatR;

namespace LanchoneteRisa.Application.Commands.Payments;

public class CreatePaymentCommand : IRequest<PaymentDto>
{
    public Guid OrderId { get; set; }
    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
}
