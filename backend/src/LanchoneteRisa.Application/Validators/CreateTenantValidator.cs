using FluentValidation;
using LanchoneteRisa.Application.Commands.Tenants;

namespace LanchoneteRisa.Application.Validators;

public class CreateTenantValidator : AbstractValidator<CreateTenantCommand>
{
    public CreateTenantValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

        RuleFor(x => x.Cnpj)
            .NotEmpty().WithMessage("CNPJ is required.")
            .Length(14).WithMessage("CNPJ must have 14 digits.");

        RuleFor(x => x.Plan)
            .IsInEnum().WithMessage("Invalid plan type.");
    }
}
