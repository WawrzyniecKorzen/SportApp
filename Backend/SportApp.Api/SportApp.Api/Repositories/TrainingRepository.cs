using Microsoft.EntityFrameworkCore;
using SportApp.Api.Data;
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

        public async Task<IEnumerable<Training>> GetAllAsync(int userId)
        {
            return await _context.Trainings.AsNoTracking().Where(t => t.UserId == userId).ToListAsync();
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
