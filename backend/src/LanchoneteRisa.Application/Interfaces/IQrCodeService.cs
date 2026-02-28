namespace LanchoneteRisa.Application.Interfaces;

public interface IQrCodeService
{
    Task<string> GenerateQrCode(Guid tenantId, int tableNumber);
    Task<List<string>> GenerateBatchQrCodes(Guid tenantId, int startNumber, int endNumber);
}
