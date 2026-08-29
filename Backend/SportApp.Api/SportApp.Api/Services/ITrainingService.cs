using SportApp.Api.DTOs.Trainings;
using SportApp.Api.Models;

namespace SportApp.Api.Services
{
    public interface ITrainingService
    {
        Task<IEnumerable<TrainingResponse>> GetAllAsync();

        Task<TrainingResponse> GetByIdAsync(int id);
        Task<TrainingResponse> AddAsync(CreateTrainingRequest request);

        Task<bool> UpdateAsync(int id, UpdateTrainingRequest request);

        Task<bool> DeleteAsync(int id);
    }
}
