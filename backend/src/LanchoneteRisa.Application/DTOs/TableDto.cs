namespace LanchoneteRisa.Application.DTOs;

public class TableDto
{
    public Guid Id { get; set; }
    public int Number { get; set; }
    public string? QrCodeUrl { get; set; }
    public bool IsActive { get; set; }
}
