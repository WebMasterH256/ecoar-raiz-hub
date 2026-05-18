using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ecoar.Domain.Entities;

namespace Ecoar.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task SaveChangesAsync();
    }

    public interface ICitizenRepository : IRepository<Citizen>
    {
        Task<Citizen?> GetByEmailAsync(string email);
        Task<IEnumerable<Citizen>> GetRankingAsync();
    }

    public interface IActivityRepository : IRepository<Activity>
    {
        Task<IEnumerable<Activity>> GetActiveActivitiesAsync();
    }
}