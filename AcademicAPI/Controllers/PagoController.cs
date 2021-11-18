using System.Data.Common;

namespace AcademicAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PagoController : ControllerBase
{
    private readonly creciendojuntosContext _context;

    public PagoController(creciendojuntosContext context)
    {
        _context = context;
    }

    // GET: api/Pago
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pago>>> GetPagos()
    {
        return await _context.Pagos
        .Include(b => b.ConceptoNavigation)
        .Include(b => b.IdTutorNavigation)
        .Include(b => b.IdAlumnoNavigation)
        .Select(b => new Pago {
            IdPago = b.IdPago,
            Fecha = b.Fecha,
            ConceptoNavigation = b.ConceptoNavigation,
            IdTutorNavigation = b.IdTutorNavigation,
            IdAlumnoNavigation = b.IdAlumnoNavigation,
            Cantidad = b.Cantidad
        })
        .ToListAsync();
    }

    [HttpGet("/api/Comprobante/{id}")]
    public async Task<ActionResult<string>> Comprobante(int id)
    {
        var comprobante =  await _context.Pagos
        .Include(b => b.ConceptoNavigation)
        .Include(b => b.IdTutorNavigation)
        .Include(b => b.IdAlumnoNavigation)
        .Where(s => s.IdPago == id)
        .Select(b => new {
            ComprobanteDePago = b.ComprobanteDePago,
            FormatoComprobante = b.FormatoComprobante
        })
        .SingleAsync();
        return $"{comprobante.FormatoComprobante},{Convert.ToBase64String(comprobante.ComprobanteDePago)}";
    }

    // GET: api/Pago/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Pago>> GetPago(int id)
    {
        var pago = await _context.Pagos.FindAsync(id);

        if (pago == null)
        {
            return NotFound();
        }

        return pago;
    }

    // PUT: api/Pago/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPago(int id, Pago pago)
    {
        if (id != pago.IdPago)
        {
            return BadRequest();
        }

        _context.Entry(pago).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PagoExists(id))
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

    // POST: api/Pago
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Pago>> PostPago(Pago pago)
    {
        _context.Pagos.Add(pago);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException e)
        {
            Console.WriteLine(e);
            throw;
        }

        return CreatedAtAction("GetPago", new { id = pago.IdPago }, pago);
    }

    // DELETE: api/Pago/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePago(int id)
    {
        var pago = await _context.Pagos.FindAsync(id);
        if (pago == null)
        {
            return NotFound();
        }

        _context.Pagos.Remove(pago);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PagoExists(int id)
    {
        return _context.Pagos.Any(e => e.IdPago == id);
    }
}
