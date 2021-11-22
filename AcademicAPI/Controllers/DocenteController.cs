namespace AcademicAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DocenteController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public DocenteController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Docente
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Docente>>> GetDocentes([FromQuery] bool? activo)
    {
        if (activo == null)
            return await _context.Docentes
                .Include(s => s.AulaAsignadaNavigation)
                .OrderByDescending(a => a.Activo)
                .AsNoTracking()
                .ToListAsync();
        return await _context.Docentes.Where(d => d.Activo == activo).ToListAsync();
    }

    // GET: api/Docente/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Docente>> GetDocente(int id)
    {
        var docente = await _context.Docentes.FindAsync(id);

        if (docente == null)
        {
            return NotFound();
        }
        _context.Entry(docente).State = EntityState.Detached;

        return docente;
    }

    // PUT: api/Docente/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDocente(int id, Docente docente)
    {
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

    // DELETE: api/Docente/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDocente(int id)
    {
        var docente = await _context.Docentes.FindAsync(id);
        if (docente == null)
        {
            return NotFound();
        }

        _context.Docentes.Remove(docente);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool DocenteExists(int id)
    {
        return _context.Docentes.Any(e => e.IdDocente == id);
    }
}
