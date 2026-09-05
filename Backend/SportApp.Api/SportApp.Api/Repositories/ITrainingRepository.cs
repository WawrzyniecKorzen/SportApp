using SportApp.Api.DTOs.Trainings;
using SportApp.Api.Models;

namespace SportApp.Api.Repositories
{
    public interface ITrainingRepository
    {
        Task<TrainingPagedResult> GetAllAsync(int userId, TrainingQueryParameters parameters);
        Task<Training?> GetByIdAsync(int id, int userId);
        Task<Training> AddAsync(Training training);
        Task UpdateAsync(Training training);
        Task DeleteAsync(Training training);
    }
}
