using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendApiDotnet.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult Public()
    {
        return Ok("Endpoint público");
    }

    [HttpGet("authenticated")]
    public IActionResult Authenticated()
    {
        return Ok("Usuario autenticado");
    }

    [Authorize(Roles = "user")]
    [HttpGet("user")]
    public IActionResult User()
    {
        return Ok("Usuarios con rol USER");
    }

    [Authorize(Roles = "admin")]
    [HttpGet("admin")]
    public IActionResult Admin()
    {
        return Ok("Solo ADMIN");
    }
}
