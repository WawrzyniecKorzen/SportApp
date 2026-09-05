using System.ComponentModel.DataAnnotations;

namespace SportApp.Api.DTOs.Users
{
    public class UpdateUserRequest
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}