using Microsoft.EntityFrameworkCore;
using EcoarBackend.Models;
using EcoarBackend.Services;

namespace EcoarBackend.Data;

public class EcoarDbContext : DbContext
{
    private readonly IAuthService _authService;

    public EcoarDbContext(DbContextOptions<EcoarDbContext> options, IAuthService authService) 
        : base(options) 
    {
        _authService = authService;
    }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Reward> Rewards { get; set; }
    public DbSet<RedeLocal> RedeLocais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Profile>().HasIndex(u => u.Email).IsUnique();
        
        // Seed fixed users requested by user
        modelBuilder.Entity<Profile>().HasData(
            new Profile 
            { 
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                Email = "admin@email.com",
                PasswordHash = _authService.HashPassword("12345678"),
                FullName = "Mateus",
                Nivel = "Coordenação",
                CreatedAt = DateTime.UtcNow
            },
            new Profile 
            { 
                Id = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                Email = "user@email.com",
                PasswordHash = _authService.HashPassword("12345678"),
                FullName = "Mateus",
                Nivel = "Broto",
                CreatedAt = DateTime.UtcNow
            }
        );

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
