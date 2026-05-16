using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoarBackend.Data;
using EcoarBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace EcoarBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ActivitiesController : ControllerBase
{
    private readonly EcoarDbContext _context;

    public ActivitiesController(EcoarDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        activity.Id = Guid.NewGuid();
        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetActivities), new { id = activity.Id }, activity);
    }
}
