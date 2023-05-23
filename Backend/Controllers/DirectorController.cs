using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private readonly IPersonRepository _repository;

        public DirectorController(IPersonRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Directors/10/10
        [HttpGet("{skip}/{limit}")]
        public async Task<ActionResult<IEnumerable<Director>>> GetDirectors(int skip, int limit)
        {
            var directors = await _repository.GetAllDirectorsLimit(skip, limit);
            if (directors.Count == 0)
            {
                return NotFound();
            }
            var total = await _repository.GetDirectorsCount();
            return Ok(new { directors, total });
        }

        // GET: api/Director/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Director>> GetDirector(int id)
        {
            var director = await _repository.GetStarOrDirectorById(id);
            if (director == null)
            {
                return NotFound();
            }

            return Ok(director);
        }

       
    }
}
