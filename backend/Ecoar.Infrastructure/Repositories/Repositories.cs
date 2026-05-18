using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecoar.Domain.Entities;
using Ecoar.Domain.Interfaces;
using Ecoar.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Ecoar.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly EcoarContext _context;
        public Repository(EcoarContext context) => _context = context;

        public async Task<T?> GetByIdAsync(Guid id) => await _context.Set<T>().FindAsync(id);
        public async Task<IEnumerable<T>> GetAllAsync() => await _context.Set<T>().ToListAsync();
        public async Task AddAsync(T entity) => await _context.Set<T>().AddAsync(entity);
        public void Update(T entity) => _context.Set<T>().Update(entity);
        public void Delete(T entity) => _context.Set<T>().Remove(entity);
        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }

    public class CitizenRepository : Repository<Citizen>, ICitizenRepository
    {
        public CitizenRepository(EcoarContext context) : base(context) { }

        public async Task<Citizen?> GetByEmailAsync(string email) => 
            await _context.Citizens.FirstOrDefaultAsync(c => c.Email == email);

        public async Task<IEnumerable<Citizen>> GetRankingAsync() =>
            await _context.Citizens
                .OrderByDescending(c => c.Seeds)
                .ThenByDescending(c => c.CompletedActivitiesCount)
                .ToListAsync();
    }

    public class ActivityRepository : Repository<Activity>, IActivityRepository
    {
        public ActivityRepository(EcoarContext context) : base(context) { }

        public async Task<IEnumerable<Activity>> GetActiveActivitiesAsync() =>
            await _context.Activities
                .Where(a => a.RegistrationDeadline > DateTime.UtcNow)
                .Include(a => a.Coordinator)
                .ToListAsync();
    }
}