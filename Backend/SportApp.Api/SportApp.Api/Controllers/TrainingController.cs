using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
        var trainings = await _service.GetAllAsync();

        if (trainings == null) return NotFound();

        return Ok(trainings);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TrainingResponse>> GetById(int id)
    {
        var training = await _service.GetAllAsync();

        if (training == null) return NotFound();

        return Ok(training);
    }

    [HttpPost]
    public async Task<ActionResult<TrainingResponse>> Create(CreateTrainingRequest request)
    {
        var createdTraining = await _service.AddAsync(request);

        return CreatedAtAction(nameof(GetById), new {id = createdTraining.Id}, createdTraining);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateTrainingRequest request)
    {
        var updated = await _service.UpdateAsync(id, request);

        if (!updated) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if(!deleted) return NotFound();

        return NoContent();
    }
}
