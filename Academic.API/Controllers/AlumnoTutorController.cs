namespace Academic.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AlumnoTutorController : ControllerBase
{
    private readonly academicContext _context;

    public AlumnoTutorController(academicContext context)
    {
        _context = context;
    }

    // GET: api/AlumnoTutor
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Tutor>>> GetTutorsByAlumno(int id)
    {
        return await _context.AlumnoTutors
            .Where(x => x.IdAlumno == id)
            .Select(x => x.IdTutorNavigation)
            .ToListAsync();
    }

    // GET: api/GetRemainingTutorsByAlumno/{id}
    [HttpGet("/api/GetRemainingTutorsByAlumno/{id}")]
    public async Task<ActionResult<IEnumerable<Tutor>>> GetRemainingTutorsByAlumno(int id)
    {
        return await _context.Tutors
            .Where(x => !_context.AlumnoTutors
                .Where(x => x.IdAlumno == id)
                .Select(x => x.IdTutorNavigation)
                .Contains(x))
            .ToListAsync();
    }

    // POST: api/AlumnoTutor
    [HttpPost]
    public async Task<ActionResult<AlumnoTutor>> PostAlumnoTutor([FromBody] AlumnoTutor alumnoTutor)
    {
        _context.AlumnoTutors.Add(alumnoTutor);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException e)
        {
            Console.WriteLine(e);
            throw;
        }

        return CreatedAtAction("PostAlumnoTutor", new { id = alumnoTutor.IdAlumno }, alumnoTutor);
    }

    // PUT: api/AlumnoTutor
    [HttpPut]
    public async Task<ActionResult<AlumnoTutor>> PutAlumnoTutor([FromBody] AlumnoTutor alumnoTutor)
    {
        _context.AlumnoTutors.Update(alumnoTutor);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException e)
        {
            Console.WriteLine(e);
            throw;
        }

        return NoContent();
    }

    // DELETE: api/AlumnoTutor/5
    [HttpDelete()]
    public async Task<IActionResult> DeleteAlumnoTutor([FromBody] AlumnoTutor body)
    {
        var alumnoTutor = await _context.AlumnoTutors.FirstOrDefaultAsync(x => x.IdTutor == body.IdTutor && x.IdAlumno == body.IdAlumno);
        if (alumnoTutor == null)
        {
            return NotFound();
        }

        _context.AlumnoTutors.Remove(alumnoTutor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
