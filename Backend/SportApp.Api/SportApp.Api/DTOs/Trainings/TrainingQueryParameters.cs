using SportApp.Api.Models;

namespace SportApp.Api.DTOs.Trainings
{
    public class TrainingQueryParameters
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public TrainingType? Type { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
