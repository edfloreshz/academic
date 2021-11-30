namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AlumnoController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public AlumnoController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Alumno
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnos([FromQuery] bool? activo)
    {
        if (activo.HasValue) {
            return await _context.Alumnos
                .Include(a => a.AulaNavigation)
                .Where(x => x.Activo == activo)
                .ToListAsync();
        }
        return await _context.Alumnos
            .OrderByDescending(a => a.Activo)
            .Include(a => a.AulaNavigation)
            .ToListAsync();
    }

    // GET: api/GetAlumnosByTutor
    [HttpGet("/api/GetAlumnosByTutor/{id}")]
    public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnosByTutor(int id)
    {
        return await _context.AlumnoTutors.Where(x => x.IdTutor == id).Select(a => a.IdAlumnoNavigation).ToListAsync();
    }

    // GET: api/Alumno/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Alumno>> GetAlumno(int id)
    {
        var alumno = await _context.Alumnos.FindAsync(id);

        if (alumno == null)
            return NotFound();

        return alumno;
    }

    // PUT: api/Alumno/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlumno(int id, Alumno alumno)
    {
        if (id != alumno.IdAlumno)
        {
            return BadRequest();
        }

        _context.Entry(alumno).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlumnoExists(id))
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

    // POST: api/Alumno
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Alumno>> PostAlumno(Alumno alumno)
    {
        alumno.Activo = true;
        _context.Alumnos.Add(alumno);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAlumno", new { id = alumno.IdAlumno }, alumno);
    }

    // DELETE: api/Alumno/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlumno(int id)
    {
        var alumno = await _context.Alumnos.FindAsync(id);
        if (alumno == null)
            return BadRequest();

        _context.Entry(alumno).State = EntityState.Modified;
        alumno.Activo = false;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlumnoExists(id))
                return NotFound();
        }

        return NoContent();
    }
    
    [HttpPut("/api/ReactivateAlumno/{id}")]
    public async Task<IActionResult> ReactivateAlumno(int id)
    {
        var alumno = await _context.Alumnos.FindAsync(id);
        if (alumno == null)
            return BadRequest();

        _context.Entry(alumno).State = EntityState.Modified;
        alumno.Activo = true;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlumnoExists(id))
                return NotFound();
        }

        return NoContent();
    }

    private bool AlumnoExists(int id)
    {
        return _context.Alumnos.Any(e => e.IdAlumno == id);
    }
}
