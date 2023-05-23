using Backend.Data.Abstraction;
using Backend.DTOs;
using Backend.Models;
using Backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController: ControllerBase
{
    private readonly IUserRepository _repository;
    public AuthenticationController(IUserRepository repository)
    {
        _repository = repository;
    }
    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult<UserDTO>> Login([FromBody] UserDTO userDTO)
    {
        var user = await _repository.GetUserByUsername(userDTO.Username);
        bool correctPassword = AuthorizationProvider.VerifyPasword(userDTO.Password, user);

        if(!correctPassword)
        {
            return BadRequest("Incorrect password");
        }
        var newUserDTO = Mapper.MapUserToDTO(user);
        return Ok(newUserDTO);
    }

    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult<string>> Register([FromBody] UserDTO userDTO)
    {
        var user = Mapper.MapUserFromDTO(userDTO);
        try
        {
            await _repository.AddUser(user);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
        return Ok(user.APIKey);
    }
}