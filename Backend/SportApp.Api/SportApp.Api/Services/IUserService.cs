using SportApp.Api.DTOs.Users;

namespace SportApp.Api.Services
{
    public interface IUserService
    {
        Task<UserResponse?> GetCurrentUserAsync(int userId);
    }
}