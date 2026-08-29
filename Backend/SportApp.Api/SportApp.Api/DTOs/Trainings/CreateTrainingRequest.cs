namespace SportApp.Api.DTOs.Trainings
{
    public class CreateTrainingRequest
    {
        public string Type { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public double Distance { get; set; }
        public int Calories { get; set; }
        public string? Description { get; set; }
    }
}
