using LanchoneteRisa.Domain.Entities;
using LanchoneteRisa.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LanchoneteRisa.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    private readonly ITenantProvider _tenantProvider;

    public AppDbContext(DbContextOptions<AppDbContext> options, ITenantProvider tenantProvider)
        : base(options)
    {
        _tenantProvider = tenantProvider;
    }

    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Table> Tables => Set<Table>();
    public DbSet<TableSession> TableSessions => Set<TableSession>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<PrintLog> PrintLogs => Set<PrintLog>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<WaiterCall> WaiterCalls => Set<WaiterCall>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Global query filters for tenant isolation
        var tenantId = _tenantProvider.GetTenantId();

        modelBuilder.Entity<User>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<Table>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<TableSession>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<Order>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<Payment>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<PrintLog>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<AuditLog>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<WaiterCall>().HasQueryFilter(e => e.TenantId == tenantId);
        modelBuilder.Entity<Category>().HasQueryFilter(e => e.IsGlobal || e.TenantId == tenantId);
        modelBuilder.Entity<Product>().HasQueryFilter(e => e.IsGlobal || e.TenantId == tenantId);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var tenantId = _tenantProvider.GetTenantId();
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Entity.SetUpdatedAt();
            }
        }

        // Auto-set TenantId on tenant-scoped entities
        SetTenantId<User>(tenantId);
        SetTenantId<Table>(tenantId);
        SetTenantId<TableSession>(tenantId);
        SetTenantId<Order>(tenantId);
        SetTenantId<Payment>(tenantId);
        SetTenantId<PrintLog>(tenantId);
        SetTenantId<AuditLog>(tenantId);
        SetTenantId<WaiterCall>(tenantId);

        return await base.SaveChangesAsync(cancellationToken);
    }

    private void SetTenantId<T>(Guid tenantId) where T : class
    {
        foreach (var entry in ChangeTracker.Entries<T>().Where(e => e.State == EntityState.Added))
        {
            var tenantIdProperty = entry.Property("TenantId");
            if (tenantIdProperty is not null && (Guid)tenantIdProperty.CurrentValue! == Guid.Empty)
            {
                tenantIdProperty.CurrentValue = tenantId;
            }
        }
    }
}
