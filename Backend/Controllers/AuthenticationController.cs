using Backend.Data.Abstraction;
using Backend.DTOs;
using Backend.Models;
using Backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IUserRepository _repository;
    public AuthenticationController(IUserRepository repository)
    {
        _repository = repository;
    }
    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult<UserDTO>> Login([FromBody] LoginUser userDTO)
    {
        var user = await _repository.GetUserByUsername(userDTO.Username);
        if (user == null)
        {
            return BadRequest("Incorrect username");
        }
        bool correctPassword = AuthorizationProvider.VerifyPasword(userDTO.Password, user);

        if (!correctPassword)
        {
            return BadRequest("Incorrect password");
        }
        var newUserDTO = Mapper.MapUserToDTO(user);
        return Ok(newUserDTO);
    }

    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult<UserDTO>> Register([FromBody] UserDTO userDTO)
    {
        userDTO.APIKey = AuthorizationProvider.GenerateAPIKey(userDTO.Username);
        var user = Mapper.MapUserFromDTO(userDTO);
        try
        {
            await _repository.AddUser(user);
        }
        catch (Exception e)
        {
            return Conflict(e.Message);
        }
        var addedUser = await _repository.GetUserByEmail(user.Email);
        if (addedUser == null)
        {
            return BadRequest("Something went wrong");
        }
        var addedUserDTO = Mapper.MapUserToDTO(addedUser);
        return Ok(addedUserDTO);
    }
}