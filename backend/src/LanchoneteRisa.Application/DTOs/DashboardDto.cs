namespace LanchoneteRisa.Application.DTOs;

public class DashboardDto
{
    public int TotalRestaurants { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalRevenue { get; set; }
    public List<OrdersByRestaurantDto> OrdersByRestaurant { get; set; } = [];
}

public class OrdersByRestaurantDto
{
    public Guid TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public int OrderCount { get; set; }
    public decimal Revenue { get; set; }
}
