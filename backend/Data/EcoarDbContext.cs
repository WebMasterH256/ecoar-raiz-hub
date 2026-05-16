using Microsoft.EntityFrameworkCore;
using EcoarBackend.Models;

namespace EcoarBackend.Data;

public class EcoarDbContext : DbContext
{
    public EcoarDbContext(DbContextOptions<EcoarDbContext> options) : base(options) { }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Reward> Rewards { get; set; }
    public DbSet<RedeLocal> RedeLocais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Profile>().HasIndex(u => u.Email).IsUnique();
        
        // Seed initial data based on mock-data.ts
        modelBuilder.Entity<Activity>().HasData(
            new Activity { Id = Guid.NewGuid(), Nome = "Feira de Trocas Solidárias", Categoria = "Evento", Sementes = 8, Vagas = 200, Status = "Em Breve" },
            new Activity { Id = Guid.NewGuid(), Nome = "Oficina de Artesanato", Categoria = "Oficina", Sementes = 12, Vagas = 15, Status = "Em Breve" }
        );

        modelBuilder.Entity<Reward>().HasData(
            new Reward { Id = Guid.NewGuid(), Nome = "Certificado Guardião Verde", Custo = 150 },
            new Reward { Id = Guid.NewGuid(), Nome = "Kit Sustentável ECOAR", Custo = 300 }
        );
    }
}
