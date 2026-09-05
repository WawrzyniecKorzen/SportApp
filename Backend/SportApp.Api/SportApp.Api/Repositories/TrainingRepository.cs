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


        //statystyki
        public async Task<TrainingStatsResponse> GetStatsAsync(int userId, DateTime? from, DateTime? to, TrainingType? type)
        {
            var query = _context.Trainings.AsNoTracking().Where(t => t.UserId == userId);

            if (from.HasValue)
            {
                var fromDate = from.Value.Date;
                query = query.Where(t => t.Date >= fromDate);
            }

            if (to.HasValue)
            {
                var toDateExclusive = to.Value.Date.AddDays(1);
                query = query.Where(t => t.Date < toDateExclusive);
            }

            if (type.HasValue)
            {
                query = query.Where(t => t.Type == type.Value);
            }

            var totalTrainings = await query.CountAsync();

            var totalDuration = await query.SumAsync(t => (int?)t.Duration) ?? 0;

            var totalDistance = await query.SumAsync(t => (double?)t.Distance) ?? 0;

            var totalCalories = await query.SumAsync(t => (int?)t.Calories) ?? 0;

            var byType = await query.GroupBy(t => t.Type).
                Select(g => new TrainingTypeStatsResponse
                {
                    Type = g.Key,
                    TrainingsCount = g.Count(),
                    TotalDuration = g.Sum(t => t.Duration),
                    TotalDistance = g.Sum(t => t.Distance),
                    TotalCalories = g.Sum(t => t.Calories)
                })
                .OrderBy(x => x.Type)
                .ToListAsync();

            return new TrainingStatsResponse
            {
                TotalTrainings = totalTrainings,
                TotalDuration = totalDuration,
                TotalDistance = totalDistance,
                TotalCalories = totalCalories,
                ByType = byType
            };
        }
    }
}
