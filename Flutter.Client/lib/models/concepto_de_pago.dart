class ConceptoDePago {
  int idConcepto;
  String concepto;

  ConceptoDePago(this.idConcepto, this.concepto);

  factory ConceptoDePago.fromJson(Map<String, dynamic> json) {
    return ConceptoDePago(json['idConcepto'], json['concepto']);
  }
}
