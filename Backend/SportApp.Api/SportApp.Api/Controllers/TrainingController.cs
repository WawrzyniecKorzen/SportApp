using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using SportApp.Api.Services;
using SportApp.Api.DTOs.Trainings;

namespace SportApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/[controller]")]
public class TrainingController : ControllerBase
{
    private readonly ITrainingService _service;

    public TrainingController(ITrainingService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TrainingResponse>>> GetAll()
    {
        var userId = GetUserId();

        if (userId == null) return Unauthorized();

        var trainings = await _service.GetAllAsync(userId.Value);

        if (trainings == null) return NotFound();

        return Ok(trainings);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TrainingResponse>> GetById(int id)
    {
        var userId = GetUserId();

        if (userId == null) return Unauthorized();

        var training = await _service.GetByIdAsync(id, userId.Value);

        if (training == null) return NotFound();

        return Ok(training);
    }

    [HttpPost]
    public async Task<ActionResult<TrainingResponse>> Create(CreateTrainingRequest request)
    {
        var userId = GetUserId();

        if (userId == null) return Unauthorized();

        var createdTraining = await _service.AddAsync(request, userId.Value);

        return CreatedAtAction(nameof(GetById), new {id = createdTraining.Id}, createdTraining);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateTrainingRequest request)
    {
        var userId = GetUserId();

        if (userId == null) return Unauthorized();

        var updated = await _service.UpdateAsync(id, request, userId.Value);

        if (!updated) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();

        if (userId == null) return Unauthorized();

        var deleted = await _service.DeleteAsync(id, userId.Value);

        if (!deleted) return NotFound();

        return NoContent();
    }

    private int? GetUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userIdClaim == null) return null;
        if (!int.TryParse(userIdClaim, out var userId)) return null;

        return userId;
    }
}
