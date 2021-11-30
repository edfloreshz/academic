using Hasher = Rijndael256.Rijndael;
using AcademicAPI.Models;

namespace AcademicAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private IUserService _userService;
    private readonly creciendojuntosContext _context;

    public LoginController(creciendojuntosContext context, IConfiguration configuration, IUserService userService)
    {
        _context = context;
        _configuration = configuration;
        _userService = userService;
    }

    [HttpPost("/api/register")]
    [Authorize]
    public async Task<ActionResult<Docente>> Register(Docente docente)
    {
        if (await _context.Docentes.FirstOrDefaultAsync(a => a.Email == docente.Email) != null)
            return Conflict();
        docente.Password = Hasher.Encrypt(docente.Password, _configuration["JWT:key"], Rijndael256.KeySize.Aes256);
        _context.Docentes.Add(docente);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetDocente", new { id = docente.IdDocente }, docente);
    }

    [HttpPut("/api/updateUser/{id}")]
    [Authorize]
    public async Task<ActionResult<Docente>> UpdateUser(int id, Docente docente)
    {
        var encryptedPassword = Hasher.Encrypt(docente.Password, _configuration["JWT:key"], Rijndael256.KeySize.Aes256);
        if (_context.Docentes.Any(a => a.Password == encryptedPassword))
            docente.Password = encryptedPassword;

        if (id != docente.IdDocente)
            return BadRequest();
        var local = _context.Set<Docente>().Local.FirstOrDefault(entry => entry.IdDocente.Equals(id));
        if (local != null)
            _context.Entry(local).State = EntityState.Detached;
        _context.Entry(docente).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DocenteExists(id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    private bool DocenteExists(int id)
    {
        return _context.Docentes.Any(e => e.IdDocente == id);
    }

    [HttpPost("/api/activate/{idDocente}")]
    [Authorize]
    public async Task<ActionResult<Docente>> Activate(int idDocente)
    {
        var docente = await _context.Docentes.FirstOrDefaultAsync(a => a.IdDocente == idDocente);
        var isAdmin = HttpContext.Session.GetString("admin") ?? "";
        if (isAdmin == "true" && docente != null && docente.Activo == false)
        {
            docente.Activo = true;
            _context.Docentes.Update(docente);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetDocente", new { id = docente.IdDocente }, docente);
        }
        if (docente.Activo == true) return Ok("El docente ya esta activado.");
        return Unauthorized();
    }

    [HttpPost("/api/authenticate")]
    public IActionResult Authenticate([FromBody] AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);

        if (response == null)
            return Ok(new { message = "Email o contraseña es incorrecta." });
        if (response.Administrador ?? false)
            HttpContext.Session.SetString("admin", "true");
        if (response.Activo ?? false)
            HttpContext.Session.SetString("activo", "true");
        if (!string.IsNullOrEmpty(response.Token))
            HttpContext.Session.SetString("token", response.Token);
        return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [HttpPost("/api/logout")]
    public ActionResult Logout()
    {
        HttpContext.Session.Clear();
        return Ok("Sesion limpia");
    }
}
