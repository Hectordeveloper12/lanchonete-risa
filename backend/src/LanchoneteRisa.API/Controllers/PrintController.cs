using LanchoneteRisa.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PrintController : ControllerBase
{
    private readonly IPrintService _printService;

    public PrintController(IPrintService printService) => _printService = printService;

    [HttpPost("order/{orderId:guid}")]
    public async Task<IActionResult> PrintOrder(Guid orderId)
    {
        await _printService.PrintOrder(orderId);
        return Ok(new { success = true });
    }

    [HttpPost("reprint/{orderId:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> ReprintOrder(Guid orderId)
    {
        await _printService.ReprintOrder(orderId);
        return Ok(new { success = true });
    }
}
