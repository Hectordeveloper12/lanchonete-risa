namespace LanchoneteRisa.Domain.Entities;

public class OrderItem : BaseEntity
{
    public Guid OrderId { get; private set; }
    public Guid ProductId { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitPrice { get; private set; }
    public string? Notes { get; private set; }

    public Order Order { get; private set; } = null!;
    public Product Product { get; private set; } = null!;

    private OrderItem() { }

    public OrderItem(Guid orderId, Guid productId, int quantity, decimal unitPrice, string? notes = null)
    {
        OrderId = orderId;
        ProductId = productId;
        Quantity = quantity;
        UnitPrice = unitPrice;
        Notes = notes;
    }
}
