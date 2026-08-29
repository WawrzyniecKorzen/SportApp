using SportApp.Api.Models;
using SportApp.Api.Repositories;

namespace SportApp.Api.Services
{
    public class TrainingService : ITrainingService
    {
        private readonly ITrainingRepository _repository;

        public TrainingService(ITrainingRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Training>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Training> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public Task<Training> AddAsync(Training training)
        {
            return _repository.AddAsync(training);
        }

        public async Task<bool> UpdateAsync(int id, Training training)
        {
            var existingTraining = await _repository.GetByIdAsync(id);
            if (existingTraining == null) return false;

            existingTraining.Type = training.Type;
            existingTraining.Date = training.Date;
            existingTraining.Duration = training.Duration;
            existingTraining.Distance = training.Distance;
            existingTraining.Calories = training.Calories;
            existingTraining.Description = training.Description;

            await _repository.UpdateAsync(existingTraining);

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var training = await _repository.GetByIdAsync(id);

            if (training == null) return false;

            await _repository.DeleteAsync(training);

            return true;
        }
    }
}
