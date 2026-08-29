using Microsoft.AspNetCore.Mvc;
using SportApp.Api.Services;
using SportApp.Api.Models; 

namespace SportApp.Api.Controllers;

[ApiController]
[Route("/api[controller]")]
public class TrainingController : ControllerBase
{
    private readonly ITrainingService _service;

    public TrainingController(ITrainingService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Training>>> GetAll()
    {
        var trainings = await _service.GetAllAsync();

        if (trainings == null) return NotFound();

        return Ok(trainings);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Training>> GetById(int id)
    {
        var training = await _service.GetAllAsync();

        if (training == null) return NotFound();

        return Ok(training);
    }

    [HttpPost]
    public async Task<ActionResult<Training>> Create(Training training)
    {
        var createdTraining = await _service.AddAsync(training);

        return CreatedAtAction(nameof(GetById), new {id = createdTraining.Id}, createdTraining);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Training training)
    {
        var updated = await _service.UpdateAsync(id, training);

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
