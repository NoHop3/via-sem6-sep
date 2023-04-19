using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private readonly MyDbContext _context;

        public DirectorController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Directors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Director>>> GetDirectors()
        {
            if (_context.Directors == null)
            {
                return NotFound();
            }
            return await _context.Directors.ToListAsync();
        }

        // GET: api/Director/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Director>> GetDirector(int id)
        {
            if (_context.Directors == null)
            {
                return NotFound();
            }
            var director = await _context.Directors.FindAsync(id);

            if (director == null)
            {
                return NotFound();
            }

            return director;
        }

        // PUT: api/Director/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirector(int id, Director director)
        {
            if (id != director.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(director).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DirectorExists(id))
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

        // POST: api/Director
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Director>> PostDirector(Director director)
        {
            if (_context.Directors == null)
            {
                return Problem("Entity set 'MyDbContext.Directors'  is null.");
            }
            _context.Directors.Add(director);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DirectorExists(director.MovieId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDirector", new { id = director.MovieId }, director);
        }

        // DELETE: api/Director/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirector(int id)
        {
            if (_context.Directors == null)
            {
                return NotFound();
            }
            var director = await _context.Directors.FindAsync(id);
            if (director == null)
            {
                return NotFound();
            }

            _context.Directors.Remove(director);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DirectorExists(int id)
        {
            return (_context.Directors?.Any(e => e.MovieId == id)).GetValueOrDefault();
        }
    }
}
