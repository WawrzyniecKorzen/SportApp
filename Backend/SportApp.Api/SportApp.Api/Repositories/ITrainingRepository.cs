using SportApp.Api.Models;

namespace SportApp.Api.Repositories
{
    public interface ITrainingRepository
    {
        Task<IEnumerable<Training>> GetAllAsync(int userId);
        Task<Training?> GetByIdAsync(int id, int userId);
        Task<Training> AddAsync(Training training);
        Task UpdateAsync(Training training);
        Task DeleteAsync(Training training);
    }
}
