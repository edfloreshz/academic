using System;
using System.Collections.Generic;

#nullable disable

namespace AcademicAPI.Models.Kinder
{
    public partial class AlumnoTutor
    {
        public int IdAlumnoTutor { get; set; }
        public int IdAlumno { get; set; }
        public int IdTutor { get; set; }

        public virtual Alumno IdAlumnoNavigation { get; set; }
        public virtual Tutor IdTutorNavigation { get; set; }
    }
}
