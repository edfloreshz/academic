namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AulaController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public AulaController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Aula
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Aula>>> GetAulas()
    {
        return await _context.Aulas.OrderBy(a => a.IdAula).ToListAsync();
    }

    // GET: api/AlumnosAula/5
    [HttpGet("/api/GetAlumnosAulaDocente/{idDocente}")]
    public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnosAulaDocente(int idDocente, bool? isAsistencia)
    {
        var asistencia = await _context.Asistencia.Where(b => b.Fecha.Date == DateTime.Now.Date).ToListAsync();
        if (isAsistencia == false || asistencia.Count() == 0) {
            return await _context.Alumnos
            .Include(s => s.AulaNavigation)
            .OrderBy(s => s.IdAlumno)
            .Where(s => s.Aula == _context.Docentes.Find(idDocente).AulaAsignada && s.Activo == true) 
            .ToListAsync();
        } else {
            return await _context.Alumnos
            .Include(s => s.AulaNavigation)
            .OrderBy(s => s.IdAlumno)
            .Take(0)
            .ToListAsync();
        }
    }

    [HttpGet("/api/IsAulaTaken/{idAula}")]
    public ActionResult<bool> IsAulaTaken(int idAula)
    {
        var isAulaTaken = _context.Docentes.Where(s => s.AulaAsignada == idAula).Count() != 0;
        return isAulaTaken;
    }

    // GET: api/Aula/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Aula>> GetAula(int id)
    {
        var aula = await _context.Aulas.FindAsync(id);

        if (aula == null)
        {
            return NotFound();
        }

        return aula;
    }

    // PUT: api/Aula/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAula(int id, Aula aula)
    {
        if (id != aula.IdAula)
        {
            return BadRequest();
        }

        _context.Entry(aula).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AulaExists(id))
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

    // POST: api/Aula
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Aula>> PostAula(Aula aula)
    {
        _context.Aulas.Add(aula);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAula", new { id = aula.IdAula }, aula);
    }

    // DELETE: api/Aula/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAula(int id)
    {
        var aula = await _context.Aulas.FindAsync(id);
        if (aula == null)
        {
            return NotFound();
        }

        _context.Aulas.Remove(aula);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AulaExists(int id)
    {
        return _context.Aulas.Any(e => e.IdAula == id);
    }
}
