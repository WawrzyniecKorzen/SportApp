namespace SportApp.Api.Models
{
    public class Training
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public TrainingType Type { get; set; }
        public DateTime Date { get; set; } //= DateTime.UtcNow;
        public int Duration {  get; set; }
        public double Distance { get; set; }
        public int Calories { get; set; }
        public string? Description { get; set; } // bo opcjonalny
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public User User { get; set; }

    }
}
