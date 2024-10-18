using Microsoft.AspNetCore.Mvc;
using kemet_task.Data;
using kemet_task.Models;
using Microsoft.EntityFrameworkCore;

namespace kemet_task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles()
        {
            return await _context.Profiles.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Profile>> CreateProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProfile), new { id = profile.Id }, profile);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetProfile(int id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile == null)
                return NotFound();

            return profile;
        }
        [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Profile>>> SearchProfiles([FromQuery] int? id, [FromQuery] string? name, [FromQuery] string? address, [FromQuery] DateTime? dateOfBirth)
    {
        var query = _context.Profiles.AsQueryable();
        if (id.HasValue)
        {
            query = query.Where(p => p.Id == id.Value);
        }
        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(p => p.Name.Contains(name));
        }
        if (!string.IsNullOrEmpty(address))
        {
            query = query.Where(p => p.Address.Contains(address));
        }
        if (dateOfBirth.HasValue)
        {
            query = query.Where(p => p.DateOfBirth.Date == dateOfBirth.Value.Date);
        }

        var results = await query.ToListAsync();

        if (!results.Any())
        {
            return NotFound();
        }

        return Ok(results);
    }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, Profile profile)
        {
            if (id != profile.Id)
                return BadRequest();

            _context.Entry(profile).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfile(int id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile == null)
                return NotFound();

            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
