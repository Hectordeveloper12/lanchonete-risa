using LanchoneteRisa.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LanchoneteRisa.Infrastructure.Persistence.Configurations;

public class TableConfiguration : IEntityTypeConfiguration<Table>
{
    public void Configure(EntityTypeBuilder<Table> builder)
    {
        builder.ToTable("Tables");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Number)
            .IsRequired();

        builder.HasIndex(t => new { t.Number, t.TenantId })
            .IsUnique();

        builder.Property(t => t.QrCodeUrl)
            .HasMaxLength(500);

        builder.Property(t => t.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(t => t.TenantId)
            .IsRequired();

        builder.HasMany(t => t.Sessions)
            .WithOne(s => s.Table)
            .HasForeignKey(s => s.TableId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
