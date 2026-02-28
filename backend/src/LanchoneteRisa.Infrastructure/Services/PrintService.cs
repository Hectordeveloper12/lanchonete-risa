using System.Text;
using LanchoneteRisa.Application.Interfaces;
using LanchoneteRisa.Domain.Entities;
using LanchoneteRisa.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LanchoneteRisa.Infrastructure.Services;

public class PrintService : IPrintService
{
    private readonly AppDbContext _context;

    public PrintService(AppDbContext context)
    {
        _context = context;
    }

    public async Task PrintOrder(Guid orderId)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .Include(o => o.TableSession)
                .ThenInclude(ts => ts.Table)
            .FirstOrDefaultAsync(o => o.Id == orderId)
            ?? throw new InvalidOperationException($"Order {orderId} not found.");

        var receiptData = GenerateEscPosReceipt(order);

        var printLog = new PrintLog(order.TenantId, orderId, "Default");
        await _context.PrintLogs.AddAsync(printLog);
        await _context.SaveChangesAsync();
    }

    public async Task ReprintOrder(Guid orderId)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .Include(o => o.TableSession)
                .ThenInclude(ts => ts.Table)
            .FirstOrDefaultAsync(o => o.Id == orderId)
            ?? throw new InvalidOperationException($"Order {orderId} not found.");

        var receiptData = GenerateEscPosReceipt(order);

        var printLog = new PrintLog(order.TenantId, orderId, "Default");
        printLog.Reprinted = true;
        await _context.PrintLogs.AddAsync(printLog);
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Generates ESC/POS formatted receipt data for the given order.
    /// </summary>
    private static byte[] GenerateEscPosReceipt(Order order)
    {
        var sb = new StringBuilder();

        // ESC/POS: Initialize printer
        sb.Append("\x1B\x40");
        // ESC/POS: Center align
        sb.Append("\x1B\x61\x01");
        // ESC/POS: Bold on
        sb.Append("\x1B\x45\x01");

        sb.AppendLine("LANCHONETE RISA");
        sb.AppendLine("================================");

        // ESC/POS: Bold off
        sb.Append("\x1B\x45\x00");
        // ESC/POS: Left align
        sb.Append("\x1B\x61\x00");

        sb.AppendLine($"Mesa: {order.TableSession?.Table?.Number}");
        sb.AppendLine($"Pedido: {order.Id.ToString()[..8]}");
        sb.AppendLine($"Data: {order.CreatedAt:dd/MM/yyyy HH:mm}");
        sb.AppendLine("--------------------------------");

        foreach (var item in order.Items)
        {
            sb.AppendLine($"{item.Quantity}x  R$ {item.UnitPrice:F2}");
        }

        sb.AppendLine("--------------------------------");
        // ESC/POS: Bold on
        sb.Append("\x1B\x45\x01");
        sb.AppendLine($"TOTAL: R$ {order.TotalAmount:F2}");
        // ESC/POS: Bold off
        sb.Append("\x1B\x45\x00");

        if (!string.IsNullOrEmpty(order.Notes))
        {
            sb.AppendLine($"Obs: {order.Notes}");
        }

        sb.AppendLine("================================");
        // ESC/POS: Center align
        sb.Append("\x1B\x61\x01");
        sb.AppendLine("Obrigado pela preferência!");

        // ESC/POS: Feed and cut
        sb.Append("\x1D\x56\x00");

        return Encoding.UTF8.GetBytes(sb.ToString());
    }
}
