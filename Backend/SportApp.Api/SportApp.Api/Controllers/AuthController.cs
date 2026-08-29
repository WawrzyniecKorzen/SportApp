using Microsoft.AspNetCore.Mvc;
using SportApp.Api.DTOs.Auth;
using SportApp.Api.Services;

namespace SportApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController :ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
        {
            try
            {
                var response = await _authService.RegisterAsync(request);
                return Ok(response);
            }
            catch (InvalidOperationException e)
            {
                return Conflict(new { message = e.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);

            if (response == null) return Unauthorized( new { message = "Wrong email or password"});

            return Ok(response);
        }
    }
}
