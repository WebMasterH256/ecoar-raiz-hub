using Microsoft.EntityFrameworkCore;
using Ecoar.Domain.Entities;

namespace Ecoar.Infrastructure.Context
{
    public class EcoarContext : DbContext
    {
        public EcoarContext(DbContextOptions<EcoarContext> options) : base(options) { }

        public DbSet<Citizen> Citizens { get; set; }
        public DbSet<Coordinator> Coordinators { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityEnrollment> Enrollments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityEnrollment>()
                .HasKey(ae => new { ae.CitizenId, ae.ActivityId });

            modelBuilder.Entity<Citizen>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Coordinator>()
                .HasIndex(u => u.Email)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}