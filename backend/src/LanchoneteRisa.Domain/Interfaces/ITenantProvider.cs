namespace LanchoneteRisa.Domain.Interfaces;

public interface ITenantProvider
{
    Guid GetTenantId();
}
