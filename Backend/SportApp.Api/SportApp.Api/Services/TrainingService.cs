using SportApp.Api.DTOs.Trainings;
using SportApp.Api.Repositories;
using SportApp.Api.Models;

namespace SportApp.Api.Services
{
    public class TrainingService : ITrainingService
    {
        private readonly ITrainingRepository _repository;

        public TrainingService(ITrainingRepository repository)
        {
            _repository = repository;
        }
        public async Task<TrainingListResponse> GetAllAsync(int userId, TrainingQueryParameters parameters)
        {
            var result = await _repository.GetAllAsync(userId, parameters);

            return new TrainingListResponse
            {
                Items = result.Items.Select(MapToResponse),
                Page = parameters.Page,
                PageSize = parameters.PageSize,
                TotalItems = result.TotalItems,
                TotalPages = (int)Math.Ceiling(
                    result.TotalItems / (double)parameters.PageSize)
            };
        }

        public async Task<TrainingResponse> GetByIdAsync(int id, int userId)
        {
            var training = await _repository.GetByIdAsync(id, userId);
            if (training == null) {return null;}
            return MapToResponse(training);
        }

        public async Task<TrainingResponse> AddAsync(CreateTrainingRequest request, int userId)
        {
            var training = new Training
            {
                UserId = userId,
                Type = request.Type,
                Date = request.Date.ToUniversalTime(),
                Duration = request.Duration,
                Distance = request.Distance,
                Calories = request.Calories,
                Description = request.Description
            };
            Console.WriteLine($"Date: {training.Date}");
            Console.WriteLine($"Date Kind: {training.Date.Kind}");
            Console.WriteLine($"CreatedAt: {training.CreationDate}");
            Console.WriteLine($"CreatedAt Kind: {training.CreationDate.Kind}");

            var createdTraining = await _repository.AddAsync(training);

            return MapToResponse(createdTraining);
        }

        public async Task<bool> UpdateAsync(int id, UpdateTrainingRequest request, int userId)
        {
            var existingTraining = await _repository.GetByIdAsync(id, userId);

            if (existingTraining == null){ return false; }

            existingTraining.Type = request.Type;
            existingTraining.Date = request.Date.ToUniversalTime();
            existingTraining.Duration = request.Duration;
            existingTraining.Distance = request.Distance;
            existingTraining.Calories = request.Calories;
            existingTraining.Description = request.Description;

            await _repository.UpdateAsync(existingTraining);

            return true;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var training = await _repository.GetByIdAsync(id, userId);

            if (training == null) return false;

            await _repository.DeleteAsync(training);

            return true;
        }

        private static TrainingResponse MapToResponse(Training training)
        {
            return new TrainingResponse
            {
                Id = training.Id,
                UserId = training.UserId,
                Type = training.Type,
                Date = training.Date,
                Duration = training.Duration,
                Distance = training.Distance,
                Calories = training.Calories,
                Description = training.Description,
                CreatedAt = training.CreationDate
            };
        }

        //statystyki
        public async Task<TrainingStatsResponse> GetStatsAsync(int userId, DateTime? from, DateTime? to, TrainingType? type)
        {
            return await _repository.GetStatsAsync(userId, from, to, type);
        }
    }
}
