using LanchoneteRisa.Application.Commands.Tables;
using LanchoneteRisa.Application.Queries.Tables;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TablesController : ControllerBase
{
    private readonly IMediator _mediator;

    public TablesController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetTablesQuery());
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> Create([FromBody] CreateTableCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPost("batch")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> CreateBatch([FromBody] CreateBatchTablesCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
}
