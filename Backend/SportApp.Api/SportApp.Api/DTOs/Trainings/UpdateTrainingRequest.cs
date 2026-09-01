using System.ComponentModel.DataAnnotations;
using SportApp.Api.Models;
using SportApp.Api.Validation;

namespace SportApp.Api.DTOs.Trainings
{
    public class UpdateTrainingRequest
    {
        public TrainingType Type { get; set; }
        public DateTime Date { get; set; }

        [Range(ValidationConstants.MinDurationMinutes, ValidationConstants.MaxDurationMinutes)]
        public int Duration { get; set; }

        [Range(0, ValidationConstants.MaxDistanceKm)]
        public double Distance { get; set; }

        [Range(0, ValidationConstants.MaxCalories)]
        public int Calories {  get; set; }

        [StringLength(ValidationConstants.MaxDescriptionLength)]
        public string? Description { get; set; }
    }
}
