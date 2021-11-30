using System.Data.Common;

namespace AcademicAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
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
            return NotFound();

        return pago;
    }
    
    [HttpGet("/api/Pago/isDeudor/{id}")]
    public async Task<ActionResult<bool>> IsDeudor(int id)
    {
        var currentYear = DateTime.Now.Year;
        var currentMonth = DateTime.Now.Month;
        var pagos = await _context.Pagos
            .Where(s => s.IdAlumno == id)
            .Select(s => new Pago() { Fecha = s.Fecha, Concepto = s.Concepto})
            .ToListAsync();
        // Checa si el alumno tiene pago de inscripcion, seguro, libros, uniforme en este año.
        var basics = pagos.Count(s => 
            (s.Fecha.Month is >= 8 and <= 9) 
            && (s.Fecha.Day is >= 1 and <= 5 or >= 20 and <= 31) 
            && s.Fecha.Year == currentYear 
            && s.Concepto > 1);
        var isBasicCovered = basics == 4;
        // Checa si el alumno tiene pago de mensualidades en este año.
        bool isMonthlyPaymentsCovered;
        if (currentMonth > 7)
        {
            var monthlyPayments = pagos.Count(s => 
                (s.Fecha.Month is > 7 and <= 12) 
                && (s.Fecha.Day is >= 1 and <= 15)
                && (s.Fecha.Year == currentYear)
                && s.Concepto == 1);
            isMonthlyPaymentsCovered = monthlyPayments == currentMonth - 7;
        }
        else if (currentMonth is not 6)
        {
            var monthlyPayments = pagos.Count(s =>
                (s.Fecha.Month is > 7 and <= 12 or >= 1 and <= 6)
                && (s.Fecha.Day is >= 1 and <= 15)
                && (s.Fecha.Year == currentYear || s.Fecha.Year == currentYear + 1)
                && s.Concepto == 1) ;
            isMonthlyPaymentsCovered = monthlyPayments == 4 + currentMonth;
        }
        else
            isMonthlyPaymentsCovered = true;
        return !(isBasicCovered && isMonthlyPaymentsCovered);
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
