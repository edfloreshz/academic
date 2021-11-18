using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace AcademicAPI.Models.Kinder
{
    public partial class Tutor
    {
        public Tutor()
        {
            Pagos = new HashSet<Pago>();
        }

        public int IdTutor { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string NumeroCelular { get; set; }
        public string Email { get; set; }
        public string Calle { get; set; }
        public int Numero { get; set; }
        public string Colonia { get; set; }
        public string Localidad { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
        public int Cp { get; set; }
        public bool Activo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Pago> Pagos { get; set; }
    }
}
