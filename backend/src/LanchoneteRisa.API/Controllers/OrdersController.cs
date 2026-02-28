using LanchoneteRisa.Application.Commands.Orders;
using LanchoneteRisa.Application.Queries.Orders;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanchoneteRisa.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetOrdersQuery());
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetOrderByIdQuery { Id = id });
        return Ok(result);
    }

    [HttpGet("kitchen")]
    [Authorize(Roles = "Kitchen,Admin,SuperAdmin")]
    public async Task<IActionResult> GetKitchenOrders()
    {
        var result = await _mediator.Send(new GetKitchenOrdersQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPatch("{id:guid}/status")]
    [Authorize(Roles = "Kitchen,Admin,SuperAdmin")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateOrderStatusCommand command)
    {
        command.OrderId = id;
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpDelete("items/{itemId:guid}")]
    public async Task<IActionResult> CancelItem(Guid itemId, [FromQuery] string? reason)
    {
        var result = await _mediator.Send(new CancelOrderItemCommand
        {
            OrderItemId = itemId,
            Reason = reason
        });
        return Ok(new { success = result });
    }
}
