namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AsistenciaController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public AsistenciaController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Asistencia
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Asistencium>>> GetAsistencia()
    {
        return await _context.Asistencia.OrderBy(a => a.Fecha).ToListAsync();
    }

    // GET: api/Asistencia/5
    [HttpGet("/api/GetAsistenciaByAlumno/{id}")]
    public async Task<ActionResult<List<Asistencium>>> GetAsistenciaByAlumno(int id)
    {
        var asistenciaAlumno = await _context.Asistencia.Where(a => a.IdAlumno == id).ToListAsync();

        if (asistenciaAlumno == null)
        {
            return NotFound();
        }

        return asistenciaAlumno;
    }

    // PUT: api/Asistencia/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAsistencium(int id, Asistencium asistencium)
    {
        if (id != asistencium.IdAsistencia)
        {
            return BadRequest();
        }

        _context.Entry(asistencium).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AsistenciumExists(id))
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

    // POST: api/Asistencia
    [HttpPost]
    public async Task<ActionResult<Asistencium>> PostAsistencia(Asistencium[] listaDeAsistencia)
    {
        foreach (var alumno in listaDeAsistencia) {
            alumno.Fecha = DateTime.Now.Date;
            _context.Asistencia.Add(alumno);
        }
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAsistencium", listaDeAsistencia);
    }

    // DELETE: api/Asistencia/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsistencium(int id)
    {
        var asistencium = await _context.Asistencia.FindAsync(id);
        if (asistencium == null)
        {
            return NotFound();
        }

        _context.Asistencia.Remove(asistencium);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AsistenciumExists(int id)
    {
        return _context.Asistencia.Any(e => e.IdAsistencia == id);
    }
}

