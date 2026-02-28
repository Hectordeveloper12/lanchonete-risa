using LanchoneteRisa.Application.Commands.Payments;
using LanchoneteRisa.Application.Queries.Payments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PaymentsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetByDate([FromQuery] DateTime? date)
    {
        var result = await _mediator.Send(new GetPaymentsByDateQuery
        {
            Date = date ?? DateTime.UtcNow
        });
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePaymentCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
}
