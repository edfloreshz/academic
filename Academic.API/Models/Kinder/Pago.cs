using System;
using System.Collections.Generic;

#nullable disable
namespace Academic.API.Models.Kinder
{
    public partial class Pago
    {
        public int IdPago { get; set; }
        public DateTime Fecha { get; set; }
        public int Concepto { get; set; }
        public byte[] ComprobanteDePago { get; set; }
        public int IdTutor { get; set; }
        public int IdAlumno { get; set; }
        public int Cantidad { get; set; }
        public string FormatoComprobante { get; set; }

        public virtual ConceptosDePago ConceptoNavigation { get; set; }
        public virtual Alumno IdAlumnoNavigation { get; set; }
        public virtual Tutor IdTutorNavigation { get; set; }
    }
}
