using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StarController : ControllerBase
    {
        private readonly MyDbContext _context;

        public StarController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Stars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Star>>> GetStars()
        {
            if (_context.Stars == null)
            {
                return NotFound();
            }
            return await _context.Stars.ToListAsync();
        }

        // GET: api/Star/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Star>> GetStar(int id)
        {
            if (_context.Stars == null)
            {
                return NotFound();
            }
            var star = await _context.Stars.FindAsync(id);

            if (star == null)
            {
                return NotFound();
            }

            return star;
        }

        // PUT: api/Star/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStar(int id, Star star)
        {
            if (id != star.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(star).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Star
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Star>> PostStar(Star star)
        {
            if (_context.Stars == null)
            {
                return Problem("Entity set 'MyDbContext.Stars'  is null.");
            }
            _context.Stars.Add(star);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StarExists(star.MovieId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStar", new { id = star.MovieId }, star);
        }

        // DELETE: api/Star/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStar(int id)
        {
            if (_context.Stars == null)
            {
                return NotFound();
            }
            var star = await _context.Stars.FindAsync(id);
            if (star == null)
            {
                return NotFound();
            }

            _context.Stars.Remove(star);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StarExists(int id)
        {
            return (_context.Stars?.Any(e => e.MovieId == id)).GetValueOrDefault();
        }
    }
}
