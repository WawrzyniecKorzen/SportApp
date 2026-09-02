using System.ComponentModel.DataAnnotations;
using SportApp.Api.Validation;

namespace SportApp.Api.DTOs.Auth
{
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        [StringLength(ValidationConstants.MaxEmailLength)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(ValidationConstants.MaxPasswordLength, MinimumLength = ValidationConstants.MinPasswordLength)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(ValidationConstants.MaxNameLength)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(ValidationConstants.MaxNameLength)]
        public string LastName { get; set; } = string.Empty;
    }
}
