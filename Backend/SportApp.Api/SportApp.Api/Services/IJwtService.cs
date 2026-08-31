using SportApp.Api.Models;

namespace SportApp.Api.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
