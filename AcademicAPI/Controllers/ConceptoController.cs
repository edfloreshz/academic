namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ConceptoController : ControllerBase
{
    private readonly academicContext _context;

    public ConceptoController(academicContext context)
    {
        _context = context;
    }

    // GET: api/Conceptos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ConceptosDePago>>> GetConceptosDePagos()
    {
        return await _context.ConceptosDePagos.OrderBy(a => a.Concepto).ToListAsync();
    }

    // GET: api/Conceptos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ConceptosDePago>> GetConceptosDePago(int id)
    {
        var conceptosDePago = await _context.ConceptosDePagos.FindAsync(id);

        if (conceptosDePago == null)
        {
            return NotFound();
        }

        return conceptosDePago;
    }

    // PUT: api/Conceptos/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutConceptosDePago(int id, ConceptosDePago conceptosDePago)
    {
        if (id != conceptosDePago.IdConcepto)
        {
            return BadRequest();
        }

        _context.Entry(conceptosDePago).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ConceptosDePagoExists(id))
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

    // POST: api/Conceptos
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ConceptosDePago>> PostConceptosDePago(ConceptosDePago conceptosDePago)
    {
        _context.ConceptosDePagos.Add(conceptosDePago);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetConceptosDePago", new { id = conceptosDePago.IdConcepto }, conceptosDePago);
    }

    // DELETE: api/Conceptos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConceptosDePago(int id)
    {
        var conceptosDePago = await _context.ConceptosDePagos.FindAsync(id);
        if (conceptosDePago == null)
        {
            return NotFound();
        }

        _context.ConceptosDePagos.Remove(conceptosDePago);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ConceptosDePagoExists(int id)
    {
        return _context.ConceptosDePagos.Any(e => e.IdConcepto == id);
    }
}
