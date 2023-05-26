using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Abstraction;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IMovieRepository _repository;

        public HomeController(IMovieRepository repository)
        {
            _repository = repository;
        }

        
    }
}
