using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace AcademicAPI.Models.Kinder
{
    public partial class Alumno
    {
        public Alumno()
        {
            Asistencia = new HashSet<Asistencium>();
            Pagos = new HashSet<Pago>();
        }

        public int IdAlumno { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Curp { get; set; }
        public int Aula { get; set; }
        public bool Activo { get; set; }

        public virtual Aula AulaNavigation { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Asistencium> Asistencia { get; set; }

        [JsonIgnore]
        public virtual ICollection<Pago> Pagos { get; set; }
    }
}
