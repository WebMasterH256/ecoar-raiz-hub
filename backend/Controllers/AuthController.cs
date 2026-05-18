using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoarBackend.Data;
using EcoarBackend.Models;
using EcoarBackend.DTOs;
using EcoarBackend.Services;

namespace EcoarBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly EcoarDbContext _context;
    private readonly IAuthService _authService;

    public AuthController(EcoarDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpGet("profile")]
    public async Task<ActionResult> GetProfile()
    {
        var userIdString = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        
        var userId = Guid.Parse(userIdString);
        var user = await _context.Profiles.FindAsync(userId);
        if (user == null) return NotFound();

        return Ok(new {
            id = user.Id,
            nome = user.FullName,
            email = user.Email,
            sementes = user.Sementes,
            nivel = user.Nivel,
            bairro = user.Bairro
        });
    }


    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto request)
    {
        if (await _context.Profiles.AnyAsync(u => u.Email == request.Email))
            return BadRequest("Usuário já existe.");

        var user = new Profile
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            FullName = request.FullName,
            PasswordHash = _authService.HashPassword(request.Password)
        };

        _context.Profiles.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponseDto 
        { 
            Token = _authService.CreateToken(user),
            Email = user.Email,
            Id = user.Id
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto request)
    {
        var user = await _context.Profiles.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
            return BadRequest("Email ou senha incorretos.");

        return Ok(new AuthResponseDto
        {
            Token = _authService.CreateToken(user),
            Email = user.Email,
            Id = user.Id
        });
    }
}
