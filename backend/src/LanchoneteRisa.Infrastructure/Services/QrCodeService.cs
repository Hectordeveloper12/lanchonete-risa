using LanchoneteRisa.Application.Interfaces;
using QRCoder;

namespace LanchoneteRisa.Infrastructure.Services;

public class QrCodeService : IQrCodeService
{
    public Task<string> GenerateQrCode(Guid tenantId, int tableNumber)
    {
        var url = $"https://{tenantId}.lanchonetrisa.com/mesa/{tableNumber}";

        using var qrGenerator = new QRCodeGenerator();
        var qrCodeData = qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
        using var qrCode = new PngByteQRCode(qrCodeData);
        var qrCodeBytes = qrCode.GetGraphic(10);

        var base64 = Convert.ToBase64String(qrCodeBytes);
        var dataUri = $"data:image/png;base64,{base64}";

        return Task.FromResult(dataUri);
    }

    public async Task<List<string>> GenerateBatchQrCodes(Guid tenantId, int startNumber, int endNumber)
    {
        var qrCodes = new List<string>();

        for (var i = startNumber; i <= endNumber; i++)
        {
            var qrCode = await GenerateQrCode(tenantId, i);
            qrCodes.Add(qrCode);
        }

        return qrCodes;
    }
}
