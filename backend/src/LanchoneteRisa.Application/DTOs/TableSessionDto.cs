using LanchoneteRisa.Domain.Enums;

namespace LanchoneteRisa.Application.DTOs;

public class TableSessionDto
{
    public Guid Id { get; set; }
    public Guid TableId { get; set; }
    public int TableNumber { get; set; }
    public DateTime OpenedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public TableSessionStatus Status { get; set; }
}
