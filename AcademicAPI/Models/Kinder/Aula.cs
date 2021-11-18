using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace AcademicAPI.Models.Kinder
{
    public partial class Aula
    {
        public Aula()
        {
            Alumnos = new HashSet<Alumno>();
            Docentes = new HashSet<Docente>();
        }

        public int IdAula { get; set; }
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Alumno> Alumnos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Docente> Docentes { get; set; }
    }
}
