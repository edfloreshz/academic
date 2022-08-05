using System;
using System.Collections.Generic;

#nullable disable

namespace Academic.API.Models.Kinder
{
    public partial class Asistencium
    {
        public int IdAsistencia { get; set; }
        public int IdAlumno { get; set; }
        public bool Asistio { get; set; }
        public DateTime Fecha { get; set; }

        public virtual Alumno IdAlumnoNavigation { get; set; }
    }
}
