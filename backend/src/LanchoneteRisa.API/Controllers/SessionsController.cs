using LanchoneteRisa.Application.Commands.Sessions;
using LanchoneteRisa.Application.Queries.Sessions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SessionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SessionsController(IMediator mediator) => _mediator = mediator;

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveSessions()
    {
        var result = await _mediator.Send(new GetActiveSessionsQuery());
        return Ok(result);
    }

    [HttpGet("table/{tableId:guid}")]
    public async Task<IActionResult> GetByTable(Guid tableId)
    {
        var result = await _mediator.Send(new GetSessionByTableQuery { TableId = tableId });
        return Ok(result);
    }

    [HttpPost("open")]
    public async Task<IActionResult> Open([FromBody] OpenTableSessionCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetActiveSessions), result);
    }

    [HttpPost("{id:guid}/close")]
    public async Task<IActionResult> Close(Guid id)
    {
        var result = await _mediator.Send(new CloseTableSessionCommand { SessionId = id });
        return Ok(new { success = result });
    }
}
