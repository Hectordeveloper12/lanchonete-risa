using LanchoneteRisa.Application.Commands.WaiterCalls;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/waiter-calls")]
[Authorize]
public class WaiterCallsController : ControllerBase
{
    private readonly IMediator _mediator;

    public WaiterCallsController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateWaiterCallCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(new { success = result });
    }

    [HttpPatch("{id:guid}/attend")]
    [Authorize(Roles = "Waiter,Admin,SuperAdmin")]
    public async Task<IActionResult> Attend(Guid id, [FromBody] AttendWaiterCallCommand command)
    {
        command.CallId = id;
        var result = await _mediator.Send(command);
        return Ok(new { success = result });
    }
}
