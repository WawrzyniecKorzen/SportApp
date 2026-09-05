using Microsoft.EntityFrameworkCore;
using SportApp.Api.Data;
using SportApp.Api.DTOs.Trainings;
using SportApp.Api.Models;

namespace SportApp.Api.Repositories
{
    public class TrainingRepository :ITrainingRepository
    {
        private readonly AppDbContext _context;

        public TrainingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TrainingPagedResult> GetAllAsync(int userId, TrainingQueryParameters parameters)
        {
            var query = _context.Trainings.AsNoTracking().Where(t => t.UserId == userId);

            if (parameters.From.HasValue)
            {
                var fromDate = parameters.From.Value.Date;
                query = query.Where(t => t.Date >= fromDate);
            }

            if (parameters.To.HasValue)
            {
                var toDateExclusive = parameters.To.Value.Date.AddDays(1);
                query = query.Where(t => t.Date < toDateExclusive);
            }
            else if (parameters.From.HasValue)
            {
                var todayExclusive = DateTime.UtcNow.Date.AddDays(1);
                query = query.Where(t => t.Date < todayExclusive);
            }

            if (parameters.Type.HasValue)
            {
                query = query.Where(t => t.Type == parameters.Type.Value);
            }

            var totalItems = await query.CountAsync();

            var items = await query
                .OrderByDescending(t => t.Date)
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToListAsync();

            return new TrainingPagedResult
            {
                Items = items,
                TotalItems = totalItems
            };
        }

        public async Task<Training?> GetByIdAsync(int id, int userId)
        {
            return await _context.Trainings.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<Training> AddAsync(Training training)
        {
            await _context.Trainings.AddAsync(training);
            await _context.SaveChangesAsync();
            return training;
        }

        public async Task UpdateAsync(Training training)
        {
            _context.Trainings.Update(training);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Training training)
        {
            _context.Trainings.Remove(training);
            await _context.SaveChangesAsync();
        }
    }
}
