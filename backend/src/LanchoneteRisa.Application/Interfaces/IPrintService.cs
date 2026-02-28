namespace LanchoneteRisa.Application.Interfaces;

public interface IPrintService
{
    Task PrintOrder(Guid orderId);
    Task ReprintOrder(Guid orderId);
}
