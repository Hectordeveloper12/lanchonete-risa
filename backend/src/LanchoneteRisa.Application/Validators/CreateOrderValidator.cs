using FluentValidation;
using LanchoneteRisa.Application.Commands.Orders;

namespace LanchoneteRisa.Application.Validators;

public class CreateOrderValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderValidator()
    {
        RuleFor(x => x.TableSessionId)
            .NotEmpty().WithMessage("Table session is required.");

        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Order must have at least one item.");

        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(i => i.ProductId)
                .NotEmpty().WithMessage("Product is required.");

            item.RuleFor(i => i.Quantity)
                .GreaterThan(0).WithMessage("Quantity must be greater than zero.");
        });
    }
}
