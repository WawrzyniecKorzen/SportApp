namespace SportApp.Api.DTOs.Trainings
{
    public class TrainingListResponse
    {
        public IEnumerable<TrainingResponse> Items { get; set; } = new List<TrainingResponse>();

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
