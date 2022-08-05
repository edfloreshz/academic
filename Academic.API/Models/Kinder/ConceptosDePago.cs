using System;
using System.Collections.Generic;
using Newtonsoft.Json;

#nullable disable

namespace Academic.API.Models.Kinder
{
    public partial class ConceptosDePago
    {
        public ConceptosDePago()
        {
            Pagos = new HashSet<Pago>();
        }

        public int IdConcepto { get; set; }
        public string Concepto { get; set; }

        [JsonIgnore]
        public virtual ICollection<Pago> Pagos { get; set; }
    }
}
