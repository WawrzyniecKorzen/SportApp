using SportApp.Api.Models;

namespace SportApp.Api.Repositories
{
    public interface ITrainingRepository
    {
        Task<IEnumerable<Training>> GetAllAsync();
        Task<Training?> GetByIdAsync(int id);
        Task<Training> AddAsync(Training training);
        Task UpdateAsync(Training training);
        Task DeleteAsync(Training training);
    }
}
