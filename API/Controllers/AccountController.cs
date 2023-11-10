using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class AccountController : BaseApiController
{
    private readonly IUnitOfWork _uow;

    public AccountController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    [HttpPost(nameof(Register))]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _uow.UserRepository.AnyAsync(registerDto.UserName))
            return BadRequest("Username is taken");

        using var hmac = new HMACSHA512();

        var user = new AppUser()
        {
            Id = Guid.NewGuid(),
            UserName = registerDto.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        await _uow.UserRepository.AddAsync(user);
        await _uow.Complete();

        var claims = new List<Claim> 
        { 
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

         await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                }
        );

        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
        };
    }

    [HttpPost(nameof(Login))]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _uow.UserRepository.GetUserByName(loginDto.Username);

        if (user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computeHash.Length; i++)
        {
            if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid passvord");
        }

        var claims = new List<Claim> 
        { 
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };
        
        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

         await HttpContext.SignInAsync(
        CookieAuthenticationDefaults.AuthenticationScheme,
        new ClaimsPrincipal(claimsIdentity),
        new AuthenticationProperties
        {
            IsPersistent = true,
            AllowRefresh = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
        });

        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
        };
    }

    [Authorize]     
    [HttpGet(nameof(Logout))]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }
}
