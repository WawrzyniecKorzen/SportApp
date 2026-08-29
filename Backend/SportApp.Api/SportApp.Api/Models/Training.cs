namespace SportApp.Api.Models
{
    public class Training
    {
        public int Id { get; set; }
        public int USerId { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int Duration {  get; set; }
        public double Distance { get; set; }
        public int Calories { get; set; }
        public string? Description { get; set; } // bo opcjonalny
        public DateTime CreationDate { get; set; } = DateTime.Now;

        public User User { get; set; }

    }
}
