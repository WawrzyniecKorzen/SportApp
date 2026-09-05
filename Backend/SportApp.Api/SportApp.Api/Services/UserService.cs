using SportApp.Api.DTOs.Users;
using SportApp.Api.Repositories;

namespace SportApp.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserResponse?> GetCurrentUserAsync(int userId)
        {
            var user = await _repository.GetByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new UserResponse
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CreatedDate = user.CreatedDate
            };
        }
    }
}
