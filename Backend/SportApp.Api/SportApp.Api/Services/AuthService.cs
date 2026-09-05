using Microsoft.AspNetCore.Identity;
using SportApp.Api.DTOs.Auth;
using SportApp.Api.Models;
using SportApp.Api.Repositories;

namespace SportApp.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IJwtService _jwtService;
        public AuthService(IUserRepository userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _passwordHasher = new PasswordHasher<User>();
            _jwtService = jwtService;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            var user = await _userRepository.GetByEmailAsync(normalizedEmail);

            if (user == null) {return null;}

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (result == PasswordVerificationResult.Failed) { return null; }

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            var existingUser = await _userRepository.GetByEmailAsync(normalizedEmail);
            if (existingUser != null) { throw new InvalidOperationException("User with this email already exists"); }

            var user = new User
            {
                Email = normalizedEmail,
                FirstName = request.FirstName,
                LastName = request.LastName,
                CreatedDate = DateTime.UtcNow
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            var createdUser = await _userRepository.AddUserAsync(user);

            return new AuthResponse
            {
                UserId = createdUser.Id,
                Email = createdUser.Email,
                FirstName = createdUser.FirstName,
                LastName = createdUser.LastName
            };
        }
    }
}
