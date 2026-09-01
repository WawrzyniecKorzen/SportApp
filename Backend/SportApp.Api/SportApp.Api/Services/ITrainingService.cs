using SportApp.Api.DTOs.Trainings;
using SportApp.Api.Models;

namespace SportApp.Api.Services
{
    public interface ITrainingService
    {
        Task<IEnumerable<TrainingResponse>> GetAllAsync(int UserId);

        Task<TrainingResponse> GetByIdAsync(int id, int UserId);
        Task<TrainingResponse> AddAsync(CreateTrainingRequest request, int UserId);

        Task<bool> UpdateAsync(int id, UpdateTrainingRequest request, int UserId);

        Task<bool> DeleteAsync(int id, int UserId);
    }
}
