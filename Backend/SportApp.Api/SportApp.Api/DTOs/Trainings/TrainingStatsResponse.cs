using SportApp.Api.Models;

namespace SportApp.Api.DTOs.Trainings
{
    public class TrainingStatsResponse
    {
        public int TotalTrainings { get; set; }
        public int TotalDuration { get; set; }
        public double TotalDistance { get; set; }
        public int TotalCalories { get; set; }

        public IEnumerable<TrainingTypeStatsResponse> ByType { get; set; }
            = new List<TrainingTypeStatsResponse>();
    }

    public class TrainingTypeStatsResponse
    {
        public TrainingType Type { get; set; }
        public int TrainingsCount { get; set; }
        public int TotalDuration { get; set; }
        public double TotalDistance { get; set; }
        public int TotalCalories { get; set; }
    }
}