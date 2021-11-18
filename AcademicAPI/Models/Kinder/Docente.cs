using System;
using System.Collections.Generic;

#nullable disable

namespace AcademicAPI.Models.Kinder
{
    public partial class Docente
    {
        public int IdDocente { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? Activo { get; set; }
        public bool? Administrador { get; set; }
        public int AulaAsignada { get; set; }

        public virtual Aula AulaAsignadaNavigation { get; set; }
    }
}
