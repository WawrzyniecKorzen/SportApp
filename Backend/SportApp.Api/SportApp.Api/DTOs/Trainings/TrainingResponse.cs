using SportApp.Api.Models;

namespace SportApp.Api.DTOs.Trainings
{
    public class TrainingResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public TrainingType Type { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public double Distance { get; set; }
        public int Calories { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
