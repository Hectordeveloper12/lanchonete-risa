using LanchoneteRisa.Application.Queries.Menu;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMediator _mediator;

    public MenuController(IMediator mediator) => _mediator = mediator;

    [HttpGet("{tenantId:guid}")]
    public async Task<IActionResult> GetMenu(Guid tenantId)
    {
        var result = await _mediator.Send(new GetMenuQuery { TenantId = tenantId });
        return Ok(result);
    }
}
