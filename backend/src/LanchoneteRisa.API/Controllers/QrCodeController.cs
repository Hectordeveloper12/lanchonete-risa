using LanchoneteRisa.Application.Interfaces;
using LanchoneteRisa.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class QrCodeController : ControllerBase
{
    private readonly IQrCodeService _qrCodeService;
    private readonly ITenantProvider _tenantProvider;

    public QrCodeController(IQrCodeService qrCodeService, ITenantProvider tenantProvider)
    {
        _qrCodeService = qrCodeService;
        _tenantProvider = tenantProvider;
    }

    [HttpGet("table/{tableNumber:int}")]
    public async Task<IActionResult> GetForTable(int tableNumber)
    {
        var tenantId = _tenantProvider.GetTenantId();
        var result = await _qrCodeService.GenerateQrCode(tenantId, tableNumber);
        return Ok(new { qrCode = result });
    }

    [HttpPost("batch")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> GenerateBatch([FromBody] BatchQrCodeRequest request)
    {
        var tenantId = _tenantProvider.GetTenantId();
        var result = await _qrCodeService.GenerateBatchQrCodes(tenantId, request.StartNumber, request.EndNumber);
        return Ok(new { qrCodes = result });
    }

    public record BatchQrCodeRequest(int StartNumber, int EndNumber);
}
