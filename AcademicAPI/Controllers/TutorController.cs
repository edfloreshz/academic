namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TutorController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public TutorController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Tutor
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tutor>>> GetTutors()
    {
        return await _context.Tutors.OrderByDescending(a => a.Activo).ToListAsync();
    }

    // GET: api/Tutor/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Tutor>> GetTutor(int id)
    {
        var tutor = await _context.Tutors.FindAsync(id);

        if (tutor == null)
        {
            return NotFound();
        }

        return tutor;
    }

    // PUT: api/Tutor/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTutor(int id, Tutor tutor)
    {
        if (id != tutor.IdTutor)
        {
            return BadRequest();
        }

        _context.Entry(tutor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TutorExists(id))
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

    // POST: api/Tutor
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Tutor>> PostTutor(Tutor tutor)
    {
        _context.Tutors.Add(tutor);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTutor", new { id = tutor.IdTutor }, tutor);
    }

    // DELETE: api/Tutor/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTutor(int id)
    {
        var tutor = await _context.Tutors.FindAsync(id);
        if (tutor == null)
            return NotFound();
        _context.Entry(tutor).State = EntityState.Modified;
        tutor.Activo = false;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TutorExists(int id)
    {
        return _context.Tutors.Any(e => e.IdTutor == id);
    }
}
