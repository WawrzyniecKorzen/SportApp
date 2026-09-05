using SportApp.Api.Models;

namespace SportApp.Api.Repositories
{
    public class TrainingPagedResult
    {
        public IEnumerable<Training> Items { get; set; } = new List<Training>();
        public int TotalItems { get; set; }
    }
}
