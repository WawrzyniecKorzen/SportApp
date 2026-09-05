using System.ComponentModel.DataAnnotations;
using SportApp.Api.Models;
using SportApp.Api.Validation;

namespace SportApp.Api.DTOs.Trainings
{
    public class TrainingQueryParameters
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public TrainingType? Type { get; set; }

        [Range(1, ValidationConstants.MaxPages)]
        public int Page { get; set; } = 1;

        [Range(1, ValidationConstants.MaxTrainingsPerPage)]
        public int PageSize { get; set; } = 20;

        [Range(1, ValidationConstants.MaxLimit)]
        public int? Limit { get; set; }
    }
}
