using SportApp.Api.Models;

namespace SportApp.Api.Services
{
    public interface ITrainingService
    {
        Task<IEnumerable<Training>> GetAllAsync();

        Task<Training> GetByIdAsync(int id);
        Task<Training> AddAsync(Training training);

        Task<bool> UpdateAsync(int id, Training training);

        Task<bool> DeleteAsync(int id);
    }
}
