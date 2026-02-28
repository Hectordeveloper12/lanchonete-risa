using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Payments;

public class GetPaymentsByDateQuery : IRequest<List<PaymentDto>>
{
    public Guid TenantId { get; set; }
    public DateTime Date { get; set; }
}
